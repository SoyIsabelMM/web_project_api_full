const express = require('express');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use((req, res, next) => {
  req.user = {
    _id: '6566954f6f85c8f7595e2979',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', usersRoute);
app.use('/', cardsRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
