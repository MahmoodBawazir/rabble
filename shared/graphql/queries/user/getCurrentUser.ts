import { gql, useQuery } from '@apollo/client'

import userInfoFragment from '../../fragments/user/userInfo'
import { UserInfoType } from '../../../models/user'

interface GetCurrentUserResponse {
  currentUser: UserInfoType
}

export const getCurrentUserQuery = gql`
  query getCurrentUser {
    currentUser {
      ...userInfo
    }
  }
  ${userInfoFragment}
`

const useCurrentUser = () => {
  return useQuery<GetCurrentUserResponse>(getCurrentUserQuery)
}

export default useCurrentUser
