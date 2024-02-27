const express = require('express');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', cardsRoute);
app.use('/', usersRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
