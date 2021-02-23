const path = require('path');
const getDataFromFile = require('../helpers/files');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  getDataFromFile(usersDataPath).then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Запрашиваемый файл не найден' }));
};

const getUserProfile = (req, res) => getDataFromFile(usersDataPath)
  .then((users) => users.find((user) => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  })
  .catch(() => res.status(500).send({ message: 'Запрашиваемый файл не найден' }));

 const createUser = (req, res) => {
    const { name, about, avatar } = req.body;

    // записываем данные в базу
    Users.create({ name, about, avatar })
      // возвращаем записанные в базу данные пользователю
      .then(user => res.send({ data: user }))
      // если данные не записались, вернём ошибку
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
  };


module.exports = { getUsers, getUserProfile, createUser };
