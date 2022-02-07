const { Schema, model } = require('mongoose');

const vinylSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  format: {
    type: String,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
  },
  genre: {
    type: String,
  },
  style: {
    type: String,
  },
  coverImage: {
    type: String
  }
});

const Vinyl = model('Vinyl', vinylSchema);

module.exports = Vinyl;