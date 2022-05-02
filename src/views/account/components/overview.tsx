import React from 'react'

import Layout from 'components/layout'
import useCurrentUser from '../../../../shared/graphql/queries/user/useCurrentUser'
import EditProfileForm from './editProfileForm'
import ChangePasswordForm from './changePasswordForm'
import { Link } from 'react-router-dom'

const Overview: React.FC<{}> = () => {
  const { data, loading } = useCurrentUser()

  if (loading) {
    return <div>Loading...</div>
  }

  if (data?.user) {
    return (
      <Layout>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '60px 0' }}>
          <Link to="/account/notifications">Notifications</Link>
          <EditProfileForm user={data.user} />
          <ChangePasswordForm />
        </div>
      </Layout>
    )
  }

  return <div>Error!</div>
}

export default Overview
