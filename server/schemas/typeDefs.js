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
    vinylCount: Int
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    vinyl(title:String): Vinyl
    vinyls(q:String, artist:String, song:String, genre:String): [Vinyls]
    users: [User]
    user(id: ID!): User
    me: User
  }
  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addVinyl(
      userId: ID!, 
      vinylId: Int,
      title: String!, 
      format: [String], 
      label: [String], 
      type: String, 
      genre: [String],
      style: [String],
      cover_image: String!
    ): User
    deleteUser(id: ID!): Auth
    updateUser(id: ID!, email: String, username: String, password: String): Auth
    removeVinyl(userId: ID!, vinylId: ID!):User
  }
`;

module.exports = typeDefs;