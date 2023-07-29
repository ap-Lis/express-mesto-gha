const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
