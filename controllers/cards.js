/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const Card = require('../models/card');

// Получить список всех карточек
const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(404).send({ message: 'Запрашиваемый файл не найден' }));

// Создать карточку
const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Данные не прошли валидацию' });
      }
      return res.status(500).send(err);
    });
};

// Удалить карточку
const deleteCard = (req, res) => {
  Card.findOneAndRemove({ owner: req.user._id, _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Не удалось удалить карточку' });
      }
      return res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch(((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Id карточки не валидный' });
      }
      return res.status(500).send(err);
    }));
};

// Поставить карточке лайк
const putLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send(card))
  .catch(((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Id карточки не валидный' });
    }
    return res.status(500).send(err);
  }));

// Удалить у карточки лайк
const deleteLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then(() => res.status(200).send({ message: 'Карточка удалена' }))
  .catch(((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Id карточки не валидный' });
    }
    return res.status(500).send(err);
  }));

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
