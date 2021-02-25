const User = require('../models/user');

// Получить список всех юзеров
const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(404).send({ message: 'Запрашиваемый файл не найден' }));

// Получить одного юзера по id
// const getUserProfile = (req, res) => User.findbyId({ id: req.params.id })
//   .then((user) => res.status(200).send(user))
//   .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }));

const getUserProfile = (req, res) => User.findOne(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  })
  .catch(() => res.status(500).send({ message: 'Запрашиваемый файл не найден' }));

// Создать юзера
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: 'Не удалось создать пользователя' }));
};

// Обновить инфо юзера
const updateUserInfo = (req, res) => User.findByIdAndUpdate(req.params.id)
  .then(({ name, about }) => res.send({ name, about }))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }) + err);

// Обновить аватар
const updateAvatar = (req, res) => User.findByIdAndUpdate(req.params.id)
  .then(({ avatar }) => res.send({ avatar }))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }) + err);

module.exports = {
  getUsers, getUserProfile, createUser, updateUserInfo, updateAvatar,
};
