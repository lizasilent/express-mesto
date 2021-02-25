const mongoose = require('mongoose');
const user = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /^(http:|https:)\/\/w*\w/.test(v);
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
    required: [true, 'Ошибки в ссылке нет'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: user,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
