const { errorLog } = require('./loggers');

class BaseError extends Error {
  constructor(code, message, error) {
    super(message);
    this.code = code || 500;
    this.error = error || 'INTERNAL_SERVER_ERROR';
  }
}

class ServerError extends BaseError {
  constructor(message) {
    super(500, message, 'INTERNAL_SERVER_ERROR');
  }
}

class BadRequestError extends BaseError {
  constructor(message) {
    super(400, message, 'BAD_REQUEST');
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super(404, message, 'NOT_FOUND');
  }
}

class ForbiddenError extends BaseError {
  constructor(message) {
    super(403, message, 'FORBIDDEN');
  }
}

class HttpError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    Error.captureStackTrace(this, HttpError);
  }
}

const handleKnownErrors = (e) => {
  if (e instanceof BadRequestError) {
    throw new BadRequestError(e.message);
  } else if (e instanceof NotFoundError) {
    throw new NotFoundError(e.message);
  } else if (e instanceof ForbiddenError) {
    throw new ForbiddenError(e.message);
  } else {
    errorLog('ERROR:', `ServerError:${e}`);
    throw new ServerError('Something went wrong!');
  }
};

module.exports = {
  BaseError,
  ServerError,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  HttpError,
  handleKnownErrors,
};
