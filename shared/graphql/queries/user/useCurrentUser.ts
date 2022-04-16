import { gql, useQuery } from '@apollo/client'

import userInfoFragment from '../../fragments/user/userInfo'
import { UserInfoType } from '../../../models/user'

interface GetCurrentUserResponse {
  user: UserInfoType
}

export const getCurrentUserQuery = gql`
  query getCurrentUser {
    user: currentUser {
      ...userInfo
    }
  }
  ${userInfoFragment}
`

export default function useCurrentUser() {
  return useQuery<GetCurrentUserResponse>(getCurrentUserQuery, {
    fetchPolicy: 'cache-first',
  })
}
