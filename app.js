const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const PORT = 27017;

app.listen(PORT, () => (
  // eslint-disable-next-line no-console
  console.log(PORT)
));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
// eslint-disable-next-line no-console
}).then(() => console.log('Connected to DS yoyo'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // для собирания JSON-формата
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.use((req, res, next) => {
  req.user = {
    _id: '603569315f2bf32a28550443',
  };

  next();
});
