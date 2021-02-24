const Card = require('../models/card');

// Получить список всех карточек
const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(500).send({ message: 'Запрашиваемый файл не найден' }));

// Создать карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' } + err));
};

// Удалить карточку
const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => res.send(card))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' } + err));

module.exports = { getCards, createCard, deleteCard };
