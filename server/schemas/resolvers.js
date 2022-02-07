const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require('axios');

const resolvers = {
  Query: {
    vinyl: async (_, args) => {
      const { data } = await axios.get('https://api.discogs.com/database/search?q=nirvana-nevermind&title?page=1&per_page=1&token=WDJEflpaEAzNglLEICjGJpcUAwZVIRJiprohmHGh')
      return data.results
    },
    vinyls: async (_, args) => {
      const { data } = await axios.get('https://api.discogs.com/database/search?q=elvis&artist&token=WDJEflpaEAzNglLEICjGJpcUAwZVIRJiprohmHGh')
      return data.results
    },
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.passwordCompare(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;