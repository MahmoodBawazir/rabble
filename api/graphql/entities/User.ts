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
    profilePhoto: String!
  }

  type UserProviderInfo {
    providerId: String!
    displayName: String!
    email: Email!
    rawId: String!
    profilePhoto: String!
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
    profilePhoto: String
    providerUserInfo: [UserProviderInfo!]
    createdAt: Date
    modifiedAt: Date
    lastLoginAt: Date
    bannedAt: Date
    timezone: Int
    password: String
    passwordUpdatedAt: Date
    role: Role
    settings: UserSettings
  }

  input EditUserInput {
    displayName: String
    email: Email
    file: Upload
  }

  input ChangePasswordInput {
    currentPassword: String!
    newPassword: String!
    newPassword2: String!
  }

  input UpdateUserNotificationSettingsInput {
    shouldSendNewsletter: Boolean
  }

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    editUser(input: EditUserInput!): User
    changePassword(input: ChangePasswordInput!): Boolean!
    updateUserNotificationSettings(
      input: UpdateUserNotificationSettingsInput!
    ): User
  }
`

export default User
