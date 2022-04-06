import { db } from '../db'

export const createUser = ({
  input,
}: {
  input: { email: string; password: string }
}) => {
  const { email, password } = input

  const displayName = email.substring(0, email.lastIndexOf('@'))

  return db
    .table('users')
    .insert(
      {
        email,
        displayName,
        password,
        photoUrl: null,
        modifiedAt: null,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        role: 'MEMBER',
        providerUserInfo: [
          {
            providerId: 'password',
            displayName,
            email,
            rawId: 'password',
            photoUrl: null,
          },
        ],
      },
      {
        returnChanges: true,
      }
    )
    .run()
    .then(
      (result: { changes: { new_val: any }[] }) => result.changes[0].new_val
    )
    .then((user: any) => user)
}

export const getUserByEmail = (email: any) => {
  return db
    .table('users')
    .getAll(email, { index: 'email' })
    .run()
    .then((users: any) => (users && users[0]) || null)
}

export const getUserById = (id: any) => {
  return db
    .table('users')
    .getAll(id, { index: 'id' })
    .run()
    .then((users: any) => (users && users[0]) || null)
}
