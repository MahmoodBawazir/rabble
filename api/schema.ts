import { gql } from '@apollo/client'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { merge } from 'lodash'

import * as customScalars from './types/custom-scalars'

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

const resolvers = merge({}, customScalars.resolvers)

const schema = makeExecutableSchema({
  typeDefs: [customScalars.typeDefs, Root],
  resolvers,
})

export default schema
