const User = require('../models/users');

const SYNTAX_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const SUCCESS_CODE = 201;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(DEFAULT_ERROR_CODE).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при создании пользователя' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка при создании пользователя' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при получении пользователя' });
      }
      if (err.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь не найден' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка при получении пользователя' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { returnDocument: 'after', runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при обновлении информации пользователя' });
      }
      if (err.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь не найден' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'Ошибка при обновлении информации пользователя',
      });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { returnDocument: 'after', runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при обновлении аватара пользователя' });
      }
      if (err.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь не найден' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка при обновлении аватара пользователя' });
    });
};
