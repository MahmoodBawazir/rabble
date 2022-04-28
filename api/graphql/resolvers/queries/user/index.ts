import getCurrentUser from './getCurrentUser'
import photoUrl from './photoUrl'

const userQueries = {
  Query: {
    // User
    currentUser: getCurrentUser,
  },
  User: {
    photoUrl,
  },
}

export default userQueries
