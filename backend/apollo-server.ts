import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { RedisCache } from 'apollo-server-cache-redis'
import { ApolloServerPluginCacheControl } from 'apollo-server-core'

import schema from './graphql/schema'
import { __PROD__ } from '../shared/constants'

const server = new ApolloServer({
  schema,
  debug: !__PROD__,
  introspection: !__PROD__,
  context: ({ req }) => {
    const user = req.user ? req.user : null
    // console.log('user context', user)
    if (!user) {
      throw new AuthenticationError('Unauthorized. You must be logged in.')
    }

    return { user }
  },
  cache: new RedisCache({
    keyPrefix: 'apollo-cache:',
    port: 25061,
    host: 'rabble-apollo-cache-do-user-11568839-0.b.db.ondigitalocean.com',
    password: 'AVNS_t0LNh0oA4A3eDL2',
    tls: {
      rejectUnauthorized: false,
    },
  }),
  plugins: [
    // this plugin enables your GraphQL server to specify a cache policy at the field level,
    // either statically in your schema with the `@cacheControl` directive
    // or dynamically in your resolvers via the `info.cacheControl`
    // It also by default sets the cache-control HTTP response header
    ApolloServerPluginCacheControl({
      // Cache everything for 1 min by default.
      defaultMaxAge: 60,
      // Don't send the `cache-control` response header.
      calculateHttpHeaders: true,
    }),
    responseCachePlugin({
      // needed to cache PRIVATE responses
      // @see https://www.apollographql.com/docs/apollo-server/performance/caching/#identifying-users-for-private-responses
      sessionId: ({ context }) => {
        console.log('responseCachePlugin', context)

        return context.user ? context.user.id : null
      },
      // Only cache public responses
      shouldReadFromCache: ({ context }) => !context.user,
      shouldWriteToCache: ({ context }) => !context.user,
    }),
  ],
})

export default server
