const jwt = require('jsonwebtoken');
const { HttpStatus, HttpResponseMessage } = require('../enums/http');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const handleError = (res) => {
  res
    .status(HttpStatus.UNAUTHORIZED)
    .send({ message: HttpResponseMessage.UNAUTHORIZED });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return handleError(res);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleError(res);
  }

  req.user = payload;

  next();
};
