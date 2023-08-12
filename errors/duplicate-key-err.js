const errors = require('http2');

class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errors.constants.HTTP_STATUS_CONFLICT;
  }
}

module.exports = DuplicateKeyError;
