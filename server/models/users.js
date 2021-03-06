const { Schema, model } = require('mongoose');
const vinylSchema = require('./vinyl');
const bcrypt = require('bcrypt');

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
  },
  vinyl: [vinylSchema]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.virtual('vinylCount').get(function () {
  return this.vinyl.length;
});

userSchema.methods.passwordCompare = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;