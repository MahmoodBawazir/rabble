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

  type UserNotificationsSettings {
    newsletter: Boolean
  }

  type UserSettings {
    notifications: UserNotificationsSettings
  }

  type User {
    id: ID!
    displayName: String
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

  input EditUserInput {
    displayName: String
    email: Email
  }

  input ChangePasswordInput {
    currentPassword: String!
    newPassword: String!
    newPassword2: String!
  }

  extend type Query {
    currentUser: User
    getCurrentUserSettings: User
  }

  extend type Mutation {
    editUser(input: EditUserInput!): User
    changePassword(input: ChangePasswordInput!): Boolean!
  }
`

export default User
