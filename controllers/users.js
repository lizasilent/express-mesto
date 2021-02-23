const path = require('path');
const getDataFromFile = require('../helpers/files');
const User = require('../models/user');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  getDataFromFile(usersDataPath).then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Запрашиваемый файл не найден' }));
};

const getUserProfile = (req, res) => getDataFromFile(usersDataPath)
  .then(User.find((user) => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  })
  .catch(() => res.status(500).send({ message: 'Запрашиваемый файл не найден' }));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUsers, getUserProfile, createUser };
