const errors = require('http2');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errors.constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
