const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Vinyl {
    id: ID!
    title: String!
    format: [String]
    label: [String]
    type: String
    genre: [String]
    style: [String]
    cover_image: String
  }
  type Vinyls {
    id: ID!
    title: String!
    cover_image: String
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    vinyl: [Vinyl]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    vinyl: [Vinyl]
    vinyls: [Vinyls]
    users: [User]
    user(id: ID!): User
    me: User
  }
  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addVinyl(id:ID!, title: String!, cover_image: String!, email: String!): Auth
  }
`;

module.exports = typeDefs;