import getCurrentUser from './user/getCurrentUser'

const userQueries = {
  Query: {
    // User
    currentUser: getCurrentUser,
  },
}

export default userQueries
