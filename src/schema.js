const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type Mutation {
    login(data: LoginUserInput!): AuthPayload!
    signup(data: CreateUserInput!): AuthPayload!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    gender: String
    avatar: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    gender: String
    avatar: String
  }
`;

module.exports = typeDefs;
