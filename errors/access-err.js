const errors = require('http2');

class AccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errors.constants.HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = AccessError;
