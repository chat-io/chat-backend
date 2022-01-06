const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: [User!]!
    chats(userId: ID!): [Chat!]!
    user(userId: ID!): User!
    message(messageId: ID!): Message!
    messages(chatId: ID!, page: Int): MessagePayload!
  }

  type Mutation {
    login(data: LoginUserInput!): AuthPayload!
    signup(data: CreateUserInput!): AuthPayload!
    updateUser(data: UpdateUserInput!): AuthPayload!
    createChat(userId: ID!, partnerId: ID!): Chat!
    deleteChat(chatId: ID!): String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    gender: String
    avatar: String
    chats: [Chat]
    messages: [Message]
  }

  type Chat {
    id: ID!
    type: String!
    createdAt: String!
    updatedAt: String!
    users: [User!]!
    messages: [Message]
  }

  type Message {
    id: ID!
    type: String!
    message: String!
    chatId: Chat!
    fromUserId: User!
    createdAt: String!
    updatedAt: String!
  }

  type ChatUsers {
    id: ID!
    chatId: Int!
    userId: Int!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type MessagePayload {
    messages: [Message!]
    page: Int
    totalPages: Int
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
    avatar: String
  }
`;

module.exports = typeDefs;
