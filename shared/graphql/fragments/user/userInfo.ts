import { gql } from '@apollo/client'

export default gql`
  fragment userInfo on User {
    id
    displayName
    description
    headline
    email
    photoUrl
    createdAt
  }
`
