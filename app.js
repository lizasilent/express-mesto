const express = require('express');
const app = express();
const path = require("path");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");


const PORT = 3000;

app.listen(PORT, () => {
  console.log(PORT);

});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));




