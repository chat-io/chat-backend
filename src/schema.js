const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    me: User!
    users: [User2!]!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  type User2 {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    gender: String
    avatar: String
  }
`;

module.exports = typeDefs;
