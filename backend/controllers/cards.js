const { default: mongoose } = require('mongoose');
const Cards = require('../models/card');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const SERVEL_ERROR = 500;

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Cards.find({}).orFail();

    return res.json({ cards });
  } catch (err) {
    console.error(err);
    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.headers['user'];

  if (!name || !link) {
    return res
      .status(ERROR_CODE)
      .json({ message: 'Información no encontrado' });
  }

  try {
    await Cards.create({ name, link, owner: ownerId });

    return res.status(201).json({ name, link, owner: ownerId });
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') {
      return res
        .status(ERROR_CODE)
        .json({ message: 'Datos de tarjeta invalidos' });
    }

    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error al crear una nueva tarjeta' });
  }
};

module.exports.deleteCard = async (req, res) => {
  const cardId = req.params.cardId;

  try {
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(ERROR_CODE).json({ message: 'ID de tarjeta invalido' });
    }

    await Cards.findByIdAndDelete(cardId).orFail();

    return res.status(200).json({ message: 'Tarjeta eliminada exitosamente' });
  } catch (err) {
    console.error(err);

    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(NOT_FOUND).json({ message: 'Tarjeta no encontrada' });
    }

    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(ERROR_CODE)
        .json({ message: ' ID de usuario no valido' });
    }

    await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();

    return res.status(200).json({ message: 'Le diste like a la card' });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};

module.exports.disLikeCard = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(ERROR_CODE)
        .json({ message: 'ID de usuario no valido' });
    }

    await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail();

    return res.status(200).json({ message: 'Like removido con exito' });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};
