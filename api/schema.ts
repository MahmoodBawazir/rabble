import { gql } from '@apollo/client'
import { makeExecutableSchema } from '@graphql-tools/schema'

// Types
import * as customScalars from './entities/scalars'
import User from './entities/User'

// Resolvers
import resolvers from './resolvers'

const Root = gql`
  # root GraphQL data
  # https://stackoverflow.com/questions/59608833/apollo-graphql-error-query-root-type-must-be-provided
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [customScalars.typeDefs, Root, User],
  resolvers,
})

export default schema
