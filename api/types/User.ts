import { gql } from '@apollo/client'

const User = gql`
  type UserProviderInfo {
    providerId: String!
    displayName: String!
    email: LowercaseString!
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
    email: LowercaseString!
    emailVerified: Boolean
    photoUrl: String
    providerUserInfo: [UserProviderInfo]
    createdAt: Date!
    modifiedAt: Date
    lastLoginAt: Date
    timezone: Int
    passwordHash: String
    passwordUpdatedAt: Date
    isAdmin: Boolean
    settings: UserSettings
  }

  input CreateUserInput {
    email: String!
    passwordHash: String!
    providerUserInfo: [UserProviderInfo!]!
  }
`

export default User
