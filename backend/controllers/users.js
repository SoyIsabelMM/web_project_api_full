const { default: mongoose } = require('mongoose');
const Users = require('../models/user');

const NOT_FOUND = 404;
const SERVEL_ERROR = 500;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({}).orFail();

    res.json({ data: users });
  } catch (err) {
    console.error(err);
    res
      .status(SERVEL_ERROR)
      .json({ message: 'Error al obtener usuarios desde la base de datos' });
  }
};

module.exports.getUserById = async (req, res) => {
  const id = req.params._id;

  try {
    const user = await Users.findById(id).orFail();

    return res.json(user);
  } catch (err) {
    if (err instanceof mongoose.CastsError) {
      return res.status(NOT_FOUND).json({ message: 'ID de usuario no válido' });
    }

    console.error(err);
    return res
      .status(SERVEL_ERROR)
      .json({ mensaje: 'Error al obtener tarjeta desde la base de datos' });
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  try {
    await Users.create({ name, about, avatar });

    return res.status(201).json({ name, about, avatar });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error al crear un nuevo usuario' });
  }
};

module.exports.updateUserProfile = async (req, res) => {
  const id = req.user._id;

  const { name, about } = req.body;

  try {
    await Users.findByIdAndUpdate(id, { name, about }).orFail();

    res.status(200).json({ message: 'Actualización exitosa' });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};

module.exports.updateAvatarProfile = async (req, res) => {
  const id = req.user._id;

  const { avatar } = req.body;

  try {
    await Users.findByIdAndUpdate(id, { avatar }).orFail();

    res.status(200).json({ message: 'Actualización exitosa' });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVEL_ERROR)
      .json({ message: 'Error interno del servido' });
  }
};
