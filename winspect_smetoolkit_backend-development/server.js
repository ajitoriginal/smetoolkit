const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

//TODO: need to revert for pre-prod and prod
if (false) {
  console.log(`Master ${process.pid} is running. Spawning ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // ============ Worker Code Starts ============

  const express = require('express');
  const path = require('path');
  require('dotenv').config({ path: path.resolve(__dirname, './.env') });

  const app = express();
  const port = process.env.PORT || 3000;

  const swaggerUi = require('swagger-ui-express');
  const YAML = require('yamljs');
  const { errorLog, successLog } = require('./helpers/loggers');
  const initiateRouter = require('./routes/index');
  require('./helpers/cron');

  const helmet = require('helmet');
  const cors = require('cors');
  const hpp = require('hpp');
  const rateLimit = require('express-rate-limit');
  const { logRequest } = require('./securityMonitor');

  // Middleware Setup
  app.use(helmet());

  const corsOptions = {
    origin: '*',
    // origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 'Authorization', 'Access-Control-Allow-Origin',
      'client_type', 'deviceinfo', 'minorversion', 'metadata'
    ],
    credentials: true,
    maxAge: 10,
  };
  app.use(cors(corsOptions));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(logRequest);
  app.use(hpp());

  const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      errorLog('RATE LIMIT EXCEEDED:', `IP: ${req.ip}`);
      res.status(429).json({
        status: 429,
        message: 'Too many requests, please try again later.',
        body: {},
      });
    },
  });

  const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      errorLog('AUTH RATE LIMIT EXCEEDED:', `IP: ${req.ip}, Path: ${req.path}`);
      res.status(429).json({
        status: 429,
        message: 'Too many authentication attempts, please try again later.',
        body: {},
      });
    },
  });

  app.use(process.env.BASE_PATH, apiLimiter);
  app.use(`${process.env.BASE_PATH}/auth`, authLimiter);

  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.removeHeader('Server');
    next();
  });

  // Error handler
  app.use((err, req, res, next) => {
    errorLog('SERVER ERROR: ', err.stack);
    res.status(500).send({
      status: 500,
      message: err.message,
      body: {},
    });
  });

  initiateRouter(app, express.Router());

  const ValidateIPaddress = (ipaddress) => {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
  };

  // Swagger setup
  if (process.env.NODE_ENV !== 'production') {
    const swaggerDocument = YAML.load('./swagger.yaml');
    const swagPort = process.env.SWAGGER_PORT || port;
    const url = process.env.HOSTIP.split('//')[1];
    const setSwagger = ValidateIPaddress(url);

    if (setSwagger || url.includes('localhost')) {
      swaggerDocument.host = `${url}:${swagPort}`;
    } else {
      swaggerDocument.host = `${url}`;
    }

    const serverUrl = process.env.SWAGGER_URL || `http://localhost:${port}/api/v1`;
    swaggerDocument.servers = [{ url: serverUrl }];

    app.use('/api-docs', swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggerDocument));
  }

  app.get('/', (req, res) => {
    res.json({ status: 'ok' });
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  const server = app.listen(port, () => {
    successLog('PORT OPENED : ', `Worker ${process.pid} listening on port ${port}`);
  });

  server.timeout = 60000;
}
