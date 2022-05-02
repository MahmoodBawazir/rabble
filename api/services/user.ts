import { db } from '../db'
import { uploadImage } from '../utils/file-upload'

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
    .then((result: any) => {
      const createdUser = result.changes[0].new_val || result.changes[0].old_val

      return Promise.all([
        createdUser,
        createUserSettings(createdUser.id),
      ]).then(([createdUser]) => createdUser)
    })
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
        notifications: {
          newsletter: true,
        },
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

export const updateUserSettings = (id: string, settings: object) => {
  return db
    .table('usersSettings')
    .getAll(id, { index: 'userId' })
    .update(
      {
        ...settings,
      },
      { returnChanges: 'always' }
    )
    .run()
    .then((res: any) => {
      const user = res.changes[0].new_val || res.changes[0].old_val

      return user
    })
}

export const editUser = (args: any, userId: string) => {
  const { displayName, email, file } = args.input

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
      // console.log('backend file', file)
      if (file) {
        return uploadImage(file, 'users', user.id)
          .then((photoUrl) => {
            // update the user with the photoUrl
            return db
              .table('users')
              .get(user.id)
              .update(
                {
                  ...user,
                  photoUrl,
                },
                { returnChanges: 'always' }
              )
              .run()
              .then((result: any) => {
                if (result.replaced === 1) {
                  return result.changes[0].new_val
                }

                if (result.unchanged === 1) {
                  return result.changes[0].old_val
                }
              })
          })
          .catch((err: any) => {
            console.error(err)
          })
      } else {
        return db
          .table('users')
          .get(user.id)
          .update(
            {
              ...user,
            },
            { returnChanges: 'always' }
          )
          .run()
          .then((result: any) => {
            if (result.replaced === 1) {
              return result.changes[0].new_val
            }

            if (result.unchanged === 1) {
              return result.changes[0].old_val
            }
          })
      }
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
        passwordUpdatedAt: new Date(),
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
          if (result.replaced === 1) {
            return result.changes[0].new_val
          }

          if (result.unchanged === 1) {
            return result.changes[0].old_val
          }
        })
    })
}
