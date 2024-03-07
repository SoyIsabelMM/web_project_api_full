const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const Users = require('../models/user');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');
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
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.getUserById = async (req, res) => {
  const id = req.params._id;

  try {
    const user = await Users.findById(id).orFail();

    return res.json(user);
  } catch (err) {
    if (err instanceof mongoose.CastsError) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: HttpResponseMessage.NOT_FOUND });
    }

    console.error(err);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ mensaje: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  try {
    const existingEmail = await Users.findOne({ email });

    if (existingEmail) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: HttpResponseMessage.SERVER_ERROR });
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
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email }).select('+password');

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: HttpResponseMessage.UNAUTHORIZED });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: HttpResponseMessage.UNAUTHORIZED });
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
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: HttpResponseMessage.UNAUTHORIZED });
    }

    const userId = req.user._id;
    const user = await Users.findById(userId);

    return res.json(user);
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.updateUserProfile = async (req, res) => {
  const id = req.user._id;

  const { name, about } = req.body;

  try {
    await Users.findByIdAndUpdate(id, { name, about }).orFail();

    res.status(HttpStatus.OK).json({ message: HttpResponseMessage.SUCCESS });
  } catch (err) {
    console.error(err);

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};

module.exports.updateAvatarProfile = async (req, res) => {
  const id = req.user._id;

  const { avatar } = req.body;

  try {
    await Users.findByIdAndUpdate(id, { avatar }).orFail();

    res.status(HttpStatus.OK).json({ message: HttpResponseMessage.SUCCESS });
  } catch (err) {
    console.error(err);

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: HttpResponseMessage.SERVER_ERROR });
  }
};
