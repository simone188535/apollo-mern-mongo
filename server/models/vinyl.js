const { Schema } = require('mongoose');

const vinylSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  format: {
    type: [String],
  },
  label: {
    type: [String],
  },
  type: {
    type: String,
  },
  genre: {
    type: [String],
  },
  style: {
    type: [String],
  },
  cover_image: {
    type: String
  }
});

module.exports = vinylSchema;
