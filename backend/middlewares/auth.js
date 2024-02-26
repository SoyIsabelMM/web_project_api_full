const jwt = require('jsonwebtoken');
const { NOT_FOUND, SERVER_ERROR, UNAUTHORIZED } = require('../utils/constants');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const handleError = (res) => {
  res.status(UNAUTHORIZED).send({ message: 'Error de autorización' });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return handleError(res);
  }

  const token = authorization.replace('Bearer', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleError(err);
  }

  req.user = payload;

  next();
};
