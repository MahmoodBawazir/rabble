import React from 'react'

import Layout from 'components/layout'
import useCurrentUserSettings from '../../../shared/graphql/queries/user/useCurrentUserSettings'
import NotificationsForm from './components/notificationsForm'

const NotificationsPage: React.FC<{}> = () => {
  const { data, loading, error } = useCurrentUserSettings()

  return (
    <Layout>
      {loading && <div>Loading</div>}
      {data?.user && <NotificationsForm user={data.user} />}
      {error && <div>Error!</div>}
    </Layout>
  )
}

export default NotificationsPage
