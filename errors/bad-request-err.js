const errors = require('http2');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errors.constants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
