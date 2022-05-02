import { gql, useMutation } from '@apollo/client'

import { UserInfoType } from '../../../models/user'
import userInfoFragment from '../../fragments/user/userInfo'
import userSettingsFragment from '../../fragments/user/userSettings'

interface Vars {
  input: {
    shouldSendNewsletter: boolean
  }
}

export const updateUserNotificationSettingsMutation = gql`
  mutation updateUserNotificationSettings(
    $input: UpdateUserNotificationSettingsInput!
  ) {
    updateUserNotificationSettings(input: $input) {
      ...userInfo
      ...userSettings
    }
  }
  ${userInfoFragment}
  ${userSettingsFragment}
`

export default function useUpdateUserNotificatonSettings() {
  return useMutation<UserInfoType, Vars>(updateUserNotificationSettingsMutation)
}
