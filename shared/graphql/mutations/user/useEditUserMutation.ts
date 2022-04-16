import { gql, useMutation } from '@apollo/client'

import { EditUserType, UserInfoType } from '../../../models/user'
import userInfoFragment from '../../fragments/user/userInfo'

interface EditUserResponse extends UserInfoType {}

interface EditUserVariables {
  input: EditUserType
}

export const editUserMutation = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`

export default function useEditUserMutation() {
  return useMutation<EditUserResponse, EditUserVariables>(editUserMutation)
}
