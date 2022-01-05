const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type Mutation {
    login(data: LoginUserInput!): AuthPayload!
    signup(data: CreateUserInput!): AuthPayload!
    updateUser(data: UpdateUserInput!): AuthPayload!
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

  type Chat {
    id: ID!
    type: String!
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    id: ID!
    type: String!
    message: String!
    chatId: Int!
    fromUserId: Int!
    createdAt: String!
    updatedAt: String!
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

  input UpdateUserInput {
    id: ID!
    firstName: String
    lastName: String
    password: String
    gender: String
  }
`;

module.exports = typeDefs;
