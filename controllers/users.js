const path = require('path');
const getDataFromFile = require('../helpers/files');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  getDataFromFile(usersDataPath).then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

const getUserProfile = (req, res) => getDataFromFile(usersDataPath)
  .then((users) => users.find((user) => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  })
  .catch((error) => res.status(500).send(error));

module.exports = { getUsers, getUserProfile };
