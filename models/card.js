/* eslint-disable linebreak-style */
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
        // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/(www\.)?([a-zA-Z0-9\-])+\.([a-zA-Z])+\/?([a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=]+)/.test(v);
      },
      message: (props) => `Ошибка в ссылке ${props.value}`,
    },
    required: [true, 'Ошибки в ссылке нет'],
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: user,
  },
  likes: [{
    type: mongoose.ObjectId,
    ref: user,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
