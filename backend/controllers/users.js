const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const Users = require('../models/user');
const { NOT_FOUND, SERVER_ERROR, UNAUTHORIZED } = require('../utils/constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({}).orFail();

    res.json({ data: users });
  } catch (err) {
    console.error(err);
    res
      .status(SERVER_ERROR)
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
      .status(SERVER_ERROR)
      .json({ mensaje: 'Error al obtener tarjeta desde la base de datos' });
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  try {
    const existingEmail = await Users.findOne({ email });

    if (existingEmail) {
      return res
        .status(SERVER_ERROR)
        .json({ message: 'Este correo electrónico ya existe' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);

    return res
      .status(SERVER_ERROR)
      .json({ message: 'Error al crear un nuevo usuario' });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '1w' },
    );

    return res.json({ token });
  } catch (err) {
    console.error(err);

    return res
      .status(SERVER_ERROR)
      .json({ message: 'Error interno del servidor' });
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
      .status(SERVER_ERROR)
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
      .status(SERVER_ERROR)
      .json({ message: 'Error interno del servido' });
  }
};
