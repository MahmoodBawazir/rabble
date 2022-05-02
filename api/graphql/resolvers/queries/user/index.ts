import getCurrentUser from './getCurrentUser'
import photoUrl from './photoUrl'
import settings from './settings'

const userQueries = {
  Query: {
    // User
    currentUser: getCurrentUser,
  },
  User: {
    photoUrl,
    settings,
  },
}

export default userQueries
