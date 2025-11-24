const circularJson = require('circular-json');
const { errorLog } = require('../helpers/loggers');

const validateRequest = (schemas) => (req, res, next) => {
  const { querySchema, paramsSchema, bodySchema } = schemas;

  const validations = [
    { schema: querySchema, data: req.query },
    { schema: paramsSchema, data: req.params },
    { schema: bodySchema, data: req.body },
  ];

  for (const { schema, data } of validations) {
    if (schema) {
      const validationResult = schema.validate(data);
      if (validationResult.error) {
        const sanitizedMessage = validationResult.error.message.replace(/"/g, '');
        errorLog('ERROR:', `Validation: ${sanitizedMessage}\n\n Request: ${circularJson.stringify(req)}`);
        return res.status(400).json({ status: 400, message: sanitizedMessage, body: {} });
      }
    }
  }

  next();
};

module.exports = {
  validateRequest,
};
