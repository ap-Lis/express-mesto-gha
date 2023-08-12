const Card = require('../models/cards');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const AccessError = require('../errors/access-err');

const SUCCESS_CODE = 201;

module.exports.getCards = (req, res, next) => {
  Card.find({}, { strictPopulate: false })
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => cards.populate('owner'))
    .then((cards) => res.status(SUCCESS_CODE).send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Получены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((cards) => {
      if (cards.owner.toString() === req.user._id) {
        return Card.findByIdAndDelete(req.params.id).then(() => res.send({ message: 'Пост удалён' }));
      }
      return next(new AccessError('Нет доступа'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Получены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Получены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Получены некорректные данные'));
      } else {
        next(err);
      }
    });
};
