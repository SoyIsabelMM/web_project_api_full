const { default: mongoose } = require('mongoose');
const Cards = require('../models/card');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Cards.find({}).sort({ createdAt: -1 }).orFail();

    return res.json({ cards });
  } catch (err) {
    console.error(err);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  if (!name || !link) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: HttpResponseMessage.NOT_FOUND });
  }

  try {
    const newCard = await Cards.create({ name, link, owner: ownerId });

    return res
      .status(HttpStatus.CREATED)
      .json({ _id: newCard._id.toString(), name, link, owner: ownerId });
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: HttpResponseMessage.NOT_FOUND });
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.deleteCard = async (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: HttpResponseMessage.NOT_FOUND + ': ID de tarjeta invalido',
      });
    }

    const card = await Cards.findById(cardId);

    if (!card) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: HttpResponseMessage.NOT_FOUND + ': Tarjeta no encontrada',
      });
    }

    if (card.owner.toString() !== userId) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message:
          HttpResponseMessage.FORBIDDEN +
          ': No tienes permiso para borrar esta tarjeta',
      });
    }

    await Cards.findByIdAndDelete(cardId).orFail();

    return res
      .status(HttpStatus.OK)
      .json({ message: HttpResponseMessage.SUCCESS });
  } catch (err) {
    console.error(err);

    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: HttpResponseMessage.NOT_FOUND });
    }

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: HttpResponseMessage.FORBIDDEN });
    }

    await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();

    Cards.findById(req.params.cardId).then((card) => {
      res.status(HttpStatus.OK).json(card);
    });
  } catch (err) {
    console.error(err);

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.disLikeCard = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: HttpResponseMessage.NOT_FOUND + ': ID de usuario no valido',
      });
    }

    await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail();
    Cards.findById(req.params.cardId).then((card) => {
      res.status(HttpStatus.OK).json(card);
    });
  } catch (err) {
    console.error(err);

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};
