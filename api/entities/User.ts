import { gql } from '@apollo/client'

const User = gql`
  enum Role {
    ADMIN
    INSTRUCTOR
    MEMBER
  }

  input UserProviderInfoInput {
    providerId: String!
    displayName: String!
    email: Email!
    rawId: String!
    photoUrl: String!
  }

  type UserProviderInfo {
    providerId: String!
    displayName: String!
    email: Email!
    rawId: String!
    photoUrl: String!
  }

  type UserSettings {
    newsletter: Boolean
  }

  type User {
    id: ID!
    displayName: String
    description: String
    headline: String
    email: Email!
    emailVerified: Boolean
    photoUrl: String
    providerUserInfo: [UserProviderInfo!]
    createdAt: Date
    modifiedAt: Date
    lastLoginAt: Date
    timezone: Int
    password: String
    passwordUpdatedAt: Date
    role: Role
    settings: UserSettings
  }

  input CreateUserInput {
    email: Email!
    displayName: String
    password: String!
    photoUrl: String
    createdAt: Date
    lastLoginAt: Date
    providerUserInfo: [UserProviderInfoInput!]
    role: Role
  }

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    createUserWithEmail(input: CreateUserInput!): User
  }
`

export default User
