const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

//validation celebrate
const { celebrate } = require('celebrate');
const { cardCreationValidator } = require('../models/validationSchemas');

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    body: cardCreationValidator,
  }),
  createCard,
);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', disLikeCard);

module.exports = router;
