const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { HttpStatus, HttpResponseMessage } = require('./enums/http');

const {
  loginValidator,
  signUpValidator,
} = require('./models/validationSchemas');

//validation celebrate
const { celebrate, errors } = require('celebrate');

//Registro de solicitudes y errores
const { logRequest, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(logRequest);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: loginValidator,
  }),
  login,
);

app.post('/signup', celebrate({ body: signUpValidator }), createUser);

app.use(auth);

app.use('/', cardsRoute);
app.use('/', usersRoute);

app.use(errors());

app.use((err, req, res, next) => {
  console.error(err.stack);

  errorLogger.error(err.message);

  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: HttpResponseMessage.SERVER_ERROR });
});

app.use((req, res) => {
  res
    .status(HttpStatus.NOT_FOUND)
    .json({ message: HttpResponseMessage.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
