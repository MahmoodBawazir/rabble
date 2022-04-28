import argon2 from 'argon2'

import { changePassword } from '../../../../services/user'
import { ensureAuthenticated } from '../../../../utils/helpers'

export default ensureAuthenticated(async (_: any, args: any, ctx: any) => {
  const { input } = args
  const { user } = ctx

  const valid = await argon2.verify(user.password, input.currentPassword)

  if (!valid) {
    return new Error('Incorrect password provided')
  }

  const newPasswordHashed = await argon2.hash(input.newPassword)

  return await changePassword(
    { input: { newPassword: newPasswordHashed } },
    user.id
  )
    .then(() => true)
    .catch((err: any) => new Error(err.message))
})
