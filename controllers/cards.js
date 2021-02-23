const path = require('path');
const getDataFromFile = require('../helpers/files');

const usersDataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  getDataFromFile(usersDataPath).then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Запрашиваемый файл не найден' }));
};

const createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

module.exports = { getCards, createCard };
