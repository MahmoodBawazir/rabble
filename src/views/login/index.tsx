import React from 'react'
import { Link } from 'react-router-dom'

import Layout from 'components/layout'
import LoginForm from 'components/forms/loginForm'
import { CenterDiv, CardTitle, Card, CardSubheading, CardNote } from '../style'

const LoginPage: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <CenterDiv>
        <div>
          <CardTitle>Log in to rabble</CardTitle>
          <Card>
            <CardSubheading>
              Enter your email address and password.
            </CardSubheading>
            <LoginForm />
          </Card>
          <CardNote>
            Don't have an account yet? <Link to="/signup">Sign up</Link>
          </CardNote>
        </div>
      </CenterDiv>
    </Layout>
  )
}

export default LoginPage
