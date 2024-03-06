const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { SERVER_ERROR } = require('./utils/constants');

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

  res.status(SERVER_ERROR).json({ message: 'Error interno del servidor' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
