const { buildSchema } = require('graphql');

const userSchema = buildSchema(`
  type User {
    id: ID!
    fullname: String!,
    username: String!,
    email: String!,
    address: String,
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(fullname: String!, username: String!, email: String!, password: String!, address: String): User
  }
`);

module.exports = userSchema;