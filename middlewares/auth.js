const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Неправильный email или пароль'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'a-man-a-plan-a-canal-panama');
  } catch (err) {
    next(new UnauthorizedError('Неправильный email или пароль'));
  }
  req.user = payload;
  return next();
};
