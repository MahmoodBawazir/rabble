import {
  getUserSettings,
  updateUserSettings,
  getUserById,
} from '../../../../services/user'
import { ensureAuthenticated } from '../../../../utils/helpers'

export default ensureAuthenticated(async (_: any, args: any, ctx: any) => {
  const { user } = ctx
  const { shouldSendNewsletter } = args.input

  const { id, ...settings } = await getUserSettings(user.id)

  let newSettings = Object.assign({}, settings, {
    ...settings,
  })

  newSettings.notifications.newsletter = shouldSendNewsletter

  return await updateUserSettings(user.id, newSettings).then(() =>
    getUserById(user.id)
  )
})
