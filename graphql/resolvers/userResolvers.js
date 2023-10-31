const User = require('../../app/models/user');

const userResolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    },
  },
  Mutation: {
    createUser: async ({ fullname, username, email, password, address }) => {
      try {
        const newUser = new User({ fullname, username, email, password, address });
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
  }
};

module.exports = userResolvers;