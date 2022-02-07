const { Schema, model } = require('mongoose');
const VinylSchema = require('./vinyl');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,

  },
  password: {
    type: String,
    trim: true,
    unique: true,
  },
  vinyl: [VinylSchema]
});

const User = model('User', userSchema);

module.exports = User;