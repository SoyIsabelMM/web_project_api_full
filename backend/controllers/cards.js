const { default: mongoose } = require('mongoose');
const Cards = require('../models/card');
const { NOT_FOUND, SERVER_ERROR, FORBIDDEN } = require('../utils/constants');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Cards.find({}).orFail();

    return res.json({ cards });
  } catch (err) {
    console.error(err);
    return res
      .status(SERVER_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  console.log('********* ', ownerId);

  if (!name || !link) {
    return res.status(NOT_FOUND).json({ message: 'Información no encontrado' });
  }

  try {
    await Cards.create({ name, link, owner: ownerId });

    return res.status(201).json({ name, link, owner: ownerId });
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') {
      return res
        .status(NOT_FOUND)
        .json({ message: 'Datos de tarjeta invalidos' });
    }

    return res
      .status(SERVER_ERROR)
      .json({ message: 'Error al crear una nueva tarjeta' });
  }
};

module.exports.deleteCard = async (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  console.log(cardId);

  try {
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(NOT_FOUND).json({ message: 'ID de tarjeta invalido' });
    }

    const card = await Cards.findById(cardId);

    if (!card) {
      return res.status(NOT_FOUND).json({ message: 'Tarjeta no encontrada' });
    }

    if (card.owner.toString() !== userId) {
      return res
        .status(FORBIDDEN)
        .json({ message: 'No tienes permiso para borrar esta tarjeta' });
    }

    await Cards.findByIdAndDelete(cardId).orFail();

    return res.status(200).json({ message: 'Tarjeta eliminada exitosamente' });
  } catch (err) {
    console.error(err);

    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(NOT_FOUND).json({ message: 'Tarjeta no encontrada' });
    }

    return res
      .status(SERVER_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(FORBIDDEN)
        .json({ message: ' ID de usuario no valido' });
    }

    await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();

    Cards.findById(req.params.cardId).then((card) => {
      res.status(200).json(card);
    });
    //return res.status(200).json({ message: 'Le diste like a la card' });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVER_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};

module.exports.disLikeCard = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(NOT_FOUND).json({ message: 'ID de usuario no valido' });
    }

    await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail();
    Cards.findById(req.params.cardId).then((card) => {
      res.status(200).json(card);
    });
    //return res.status(200).json({ message: 'Like removido con exito' });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVER_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};
