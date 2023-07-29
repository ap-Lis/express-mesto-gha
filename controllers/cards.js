const Card = require('../models/cards');

const SYNTAX_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const ACCESS_ERROR_CODE = 403;

module.exports.getCards = (req, res) => {
  Card.find({}, { strictPopulate: false })
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(DEFAULT_ERROR_CODE).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => cards.populate('owner'))
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при создании карточки' });
      }
      if (err.name === 'CastError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при создании карточки' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка при создании карточки' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id).then((cards) => {
    if (!cards) {
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка не найдена' });
    }
    if (cards.owner.toString() === req.user._id) {
      return Card.findByIdAndDelete(req.params.id).then(() => res.send({ message: 'Пост удалён' }));
    }
    return res.status(ACCESS_ERROR_CODE).send({ message: 'Нет доступа' });
  })
    .catch((err) => res.status(DEFAULT_ERROR_CODE).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при установке лайка' });
      }
      if (err.name === 'CastError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при установке лайка' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка при установке лайка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при удалении лайка' });
      }
      if (err.name === 'CastError') {
        return res.status(SYNTAX_ERROR_CODE).send({ message: 'Ошибка при удалении лайка' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка при удалении лайка' });
    });
};
