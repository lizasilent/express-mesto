/* eslint-disable no-unused-vars */
const Card = require('../models/card');

// Получить список всех карточек
const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(404).send({ message: 'Запрашиваемый файл не найден' }));

// Создать карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(400).send({ message: 'Не удалось создать карточку' } + err));
};

// Удалить карточку
const deleteCard = (req, res) => {
  Card.findOneAndRemove({ owner: req.user._id, _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Не удалось удалить карточку' });
      }
      return res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Запрашиваемый файл не найден' }));
};

// Поставить карточке лайк
const putLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
);

// Удалить у карточки лайк
const deleteLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
);

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
