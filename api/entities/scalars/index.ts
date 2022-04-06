import { gql } from '@apollo/client'

import DateScalarType from './Date'
import EmailScalarType from './Email'

export const typeDefs = gql`
  scalar Date
  scalar Email
`

export const resolvers = {
  Date: DateScalarType,
  Email: EmailScalarType,
}
