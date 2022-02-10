const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const axios = require("axios");

const resolvers = {
  Query: {
    vinyl: async (_, { title }) => {
      const { data } = await axios.get(
        `https://api.discogs.com/database/search?q=${title}&title?page=1&per_page=1&token=WDJEflpaEAzNglLEICjGJpcUAwZVIRJiprohmHGh`
      );
      return data.results[0];
    },
    vinyls: async (_, args) => {
      console.log("args:", args);
      const params = new URLSearchParams(args);
      params.append("token", "WDJEflpaEAzNglLEICjGJpcUAwZVIRJiprohmHGh");

      const { data } = await axios.get(
        `https://api.discogs.com/database/search?${params.toString()}`
      );
      return data.results;
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
      throw new AuthenticationError("You need to be logged in!");
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
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.passwordCompare(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addVinyl: async (
      _,
      { userId, vinylId, title, format, label, type, genre, style, cover_image }
    ) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            vinyl: { title, id: vinylId, format, label, type, genre, style, cover_image },
          },
        },
        { new: true }
      )


      return { user };
    },

    deleteUser: async (_, { id }) => {
      const user = await User.findOneAndDelete({ _id: id });
      return { user };
    },

    updateUser: async (_, { id, email, username, password }) => {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          email,
          username,
          password,
        },
        {
          new: true,
          runValidators: true
        }
      );

      return { updatedUser };
    },

    removeVinyl: async (_, { userId, vinylId }) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { vinyl: { _id: vinylId } } },
        { new: true }
      );
      console.log(user);
      return { user }
    }
  },
};

module.exports = resolvers;
