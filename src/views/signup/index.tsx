import React from 'react'
import { Link } from 'react-router-dom'

import Layout from 'components/layout'
import SignupForm from 'components/forms/signupForm'
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
            <SignupForm />
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
