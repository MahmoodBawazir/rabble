import { gql, useQuery } from '@apollo/client'

import userInfoFragment from '../../fragments/user/userInfo'
import userSettingsFragment from '../../fragments/user/userSettings'
import { GetCurrentUserSettingsType } from '../../../models/user'

interface GetCurrentUserSettingsResponse {
  user: GetCurrentUserSettingsType
}

export const getCurrentUserSettingsQuery = gql`
  query getCurrentUserSettings {
    user: currentUser {
      ...userInfo
      ...userSettings
    }
  }
  ${userInfoFragment}
  ${userSettingsFragment}
`

export default function useCurrentUserSettings() {
  return useQuery<GetCurrentUserSettingsResponse>(getCurrentUserSettingsQuery, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  })
}
