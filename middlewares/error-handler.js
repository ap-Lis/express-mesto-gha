const errors = require('http2');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || errors.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = statusCode === errors.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
