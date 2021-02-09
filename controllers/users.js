const path = require("path");
const getDataFromFile = require("../helpers/files");
const usersDataPath = path.join(__dirname, "..", "data", "users.json");


const getUsers = (req, res) => {getDataFromFile(usersDataPath)
.then(users => res.status(200).send(users))
.catch(err => res.status(400).send(err));
}


const getUserProfile = (res, req) => {getDataFromFile(usersDataPath)
        .then(users => users.find(user => user.id === req.params.id))
        .then(user => {
          if (!user) {
            return res.status(404).send({message: "Нет пользователя с таким id"})
          }
          res.status(200).send(user);
        })
        .catch(err => res.status(400).send(err));
  };


module.exports = {getUsers, getUserProfile};
