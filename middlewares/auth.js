const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'a-man-a-plan-a-canal-panama');
  } catch (err) {
    next(new UnauthorizedError('Ошибка проверки jwt токена'));
  }
  req.user = payload;
  return next();
};
