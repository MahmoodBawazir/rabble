import React from 'react'
import { Link } from 'react-router-dom'

import Layout from 'components/layout'
import AuthForm from 'components/forms/authForm'
import { CenterDiv, CardTitle, Card, CardSubheading, CardNote } from '../style'

const SignupPage: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <CenterDiv>
        <div>
          <CardTitle>Create a rabble account</CardTitle>
          <Card>
            <CardSubheading>
              Sign up with your email and password.
            </CardSubheading>
            <AuthForm type="signup" />
          </Card>
          <CardNote>
            Already have an account? <Link to="/login">Login</Link>
          </CardNote>
        </div>
      </CenterDiv>
    </Layout>
  )
}

export default SignupPage
