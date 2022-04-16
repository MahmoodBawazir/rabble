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

export const createUserSettings = (id: string) => {
  return db
    .table('usersSettings')
    .insert(
      {
        userId: id,
        newsletter: true,
      },
      {
        returnChanges: 'always',
      }
    )
    .run()
    .then((res: { changes: { new_val: any }[] }) => res.changes[0].new_val)
}

export const getUserSettings = (id: string) => {
  return db
    .table('usersSettings')
    .getAll(id, { index: 'userId' })
    .run()
    .then((results: any) => {
      if (results && results.length > 0) {
        return results[0]
      } else {
        return null
      }
    })
}

export const editUser = (args: any, userId: string) => {
  const { displayName, email } = args.input

  return db
    .table('users')
    .get(userId)
    .run()
    .then((result: any) => {
      return Object.assign({}, result, {
        displayName,
        email,
        modifiedAt: new Date(),
      })
    })
    .then((user: any) => {
      db.table('users')
        .get(user.id)
        .update(
          {
            ...user,
          },
          { returnChanges: 'always' }
        )
        .run()
        .then((result: any) => {
          // documents that were updated
          if (result.replaced === 1) {
            return result.changes[0].new_val
          }

          // the number of documents that would have been modified except the new value was the same as the old value
          if (result.unchanged === 1) {
            return result.changes[0].old_val
          }
        })
    })
}

export const changePassword = (args: any, userId: string) => {
  const { newPassword } = args.input

  return db
    .table('users')
    .get(userId)
    .run()
    .then((result: any) => {
      return Object.assign({}, result, {
        password: newPassword,
        modifiedAt: new Date(),
      })
    })
    .then((user: any) => {
      db.table('users')
        .get(user.id)
        .update(
          {
            ...user,
          },
          { returnChanges: 'always' }
        )
        .run()
        .then((result: any) => {
          // documents that were updated
          if (result.replaced === 1) {
            return result.changes[0].new_val
          }

          // the number of documents that would have been modified except the new value was the same as the old value
          if (result.unchanged === 1) {
            return result.changes[0].old_val
          }
        })
    })
}
