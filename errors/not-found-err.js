const errors = require('http2');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errors.constants.HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
