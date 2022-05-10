import editUser from './editUser'
import changePassword from './changePassword'
import updateUserNotificationSettings from './updateUserNotificationSettings'

const userMutations = {
  Mutation: {
    // User
    editUser,
    changePassword,
    updateUserNotificationSettings,
  },
}

export default userMutations
