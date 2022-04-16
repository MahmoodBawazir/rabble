import { gql, useMutation } from '@apollo/client'

import { ChangePasswordType, UserInfoType } from '../../../models/user'
import userInfoFragment from '../../fragments/user/userInfo'

interface ChangePasswordResponse extends UserInfoType {}

interface ChangePasswordVariables {
  input: ChangePasswordType
}

export const changePasswordMutation = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`

export default function useChangePasswordMutation() {
  return useMutation<ChangePasswordResponse, ChangePasswordVariables>(
    changePasswordMutation
  )
}
