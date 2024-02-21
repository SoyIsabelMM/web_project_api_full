const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
