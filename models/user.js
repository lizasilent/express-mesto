const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
    required: [true, 'Ошибки в ссылке нет'],
  },

});

module.exports = mongoose.model('user', userSchema);
