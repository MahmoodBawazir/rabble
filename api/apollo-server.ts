import { ApolloServer } from 'apollo-server-express'

import schema from './schema'

const server = new ApolloServer({
  schema,
  debug: true,
  context: ({ req }) => {
    const user = req.user || null
    console.log('user context', user)
    // if (!user) throw new AuthenticationError('you must be logged in')

    return { user }
  },
})

export default server
