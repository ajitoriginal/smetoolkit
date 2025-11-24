// securityMonitor.js
/**
 * Security Monitor for Winspect SMEToolkit Backend
 * -------------------------------------------------
 * This module provides security monitoring functionality:
 * - Tracks suspicious path access attempts
 * - Monitors failed authentication attempts
 * - Sends alerts to Slack when thresholds are exceeded
 * - Helps identify potential security threats
 */

const axios = require('axios');

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '';
const projectName = 'Winspect SMEToolkit Backend';
const environment = process.env.NODE_ENV || 'development';

// Store failed attempts per IP (in-memory, use Redis in prod if you need clustering)
const failedAttempts = new Map();
const suspiciousPaths = [
  // Admin and configuration paths
  '/admin', '/config', '/server-status',

  // Database related paths
  '/phpmyadmin', '/mysql', '/mysqladmin', '/db', '/adminer', '/myadmin',
  '/phpMyAdmin', '/sql', '/database', '/db-admin', '/mysql-admin',

  // Common CMS paths (not applicable but commonly scanned)
  '/wp-login', '/wp-admin',

  // API exploration paths
  '/swagger', '/api-docs', '/graphql', '/graphiql',

  // Common vulnerability scan paths
  '/.git', '/.env','/backup', '/backups', '/bak', '/tmp', '/temp',
  '/logs', '/log', '/debug', '/console', '/shell', '/cmd'
];
const failedThreshold = 5;

async function sendSlackAlert(message) {
  try {
    // Format message with markdown for Slack
    // This ensures proper message display in Slack with formatting
    const formattedMessage = `*Security Alert*\n\n${message}`;

    await axios.post(slackWebhookUrl, {
      text: formattedMessage, // Fallback plain text for notifications
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🔐 Security Alert',
            emoji: true
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `*Project:* ${projectName} | *Environment:* ${environment} | *Time:* ${new Date().toISOString()}`
            }
          ]
        },
        {
          type: 'divider'
        }
      ]
    });
    console.log('Security alert sent to Slack successfully');
  } catch (err) {
    console.error('Slack alert failed:', err.message);
  }
}

function logRequest(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const { path } = req;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const requestMethod = req.method;
  const requestHeaders = JSON.stringify(req.headers);

  // Detect suspicious paths
  if (suspiciousPaths.includes(path)) {
    console.warn(`Blocked suspicious path: ${req.path} from IP: ${req.ip}`);
    return res.status(403).send('Forbidden');
  }

  // Track failed attempts (based on response code)
  res.on('finish', () => {
    if (res.statusCode === 400 || res.statusCode === 401 || res.statusCode === 403 || res.statusCode === 422) {
      const count = (failedAttempts.get(ip) || 0) + 1;
      failedAttempts.set(ip, count);

      if (count >= failedThreshold) {
        sendSlackAlert(`${'```'}${count} failed login/API attempts from IP: ${ip}
Path: ${path}
Method: ${requestMethod}
User-Agent: ${userAgent}
Headers: ${requestHeaders}${'```'}`);
        // Optionally block or rate-limit this IP
      }
    }

    // Alert immediately for 429 errors (validation failures)
    if (res.statusCode === 429) {
      sendSlackAlert(`${'```'}Validation error (429) detected on path: ${path}
IP: ${ip}
Method: ${requestMethod}
User-Agent: ${userAgent}
Headers: ${requestHeaders}${'```'}`);
    }

    // Reset counter on success
    if (res.statusCode === 200 && failedAttempts.has(ip)) {
      failedAttempts.delete(ip);
    }
  });

  next();
}

module.exports = {
  logRequest,
};
