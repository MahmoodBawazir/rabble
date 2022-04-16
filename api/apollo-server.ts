import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { __PROD__ } from '../shared/constants'

import schema from './graphql/schema'

const server = new ApolloServer({
  schema,
  debug: !__PROD__,
  introspection: !__PROD__,
  context: ({ req }) => {
    const user = req.user ? req.user : null
    // console.log('user context', user)
    if (!user) throw new AuthenticationError('you must be logged in')

    return { user }
  },
})

export default server
