export enum Role {
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  MEMBER = 'MEMBER',
}

export type UserSettings = {
  newsletter: Boolean
}

export type ProviderUserInfo = {
  providerId: string
  displayName: string
  email: string
  rawId: string
  photoUrl: string
}

export interface User {
  id: string
  displayName: string
  description: string
  headline: string
  email: string
  emailVerified: Boolean
  photoUrl: string
  providerUserInfo: ProviderUserInfo[]
  createdAt: Date
  modifiedAt: Date
  lastLoginAt: Date
  timezone: number
  password: string
  passwordUpdatedAt: Date
  role: Role
  settings: UserSettings
}

export type UserInfoType = Pick<
  User,
  | 'id'
  | 'displayName'
  | 'description'
  | 'headline'
  | 'email'
  | 'photoUrl'
  | 'createdAt'
>

export type LoginPayload = Pick<User, 'email' | 'password'>

export type SignUpPayload = Pick<User, 'email' | 'password'>
