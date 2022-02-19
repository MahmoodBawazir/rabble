import React from 'react'

import { Input } from 'components/formElements'
import { PrimaryButton } from 'components/button'
import { FormWrapper } from './style'

const SignupForm: React.FC<{}> = () => {
  return (
    <FormWrapper>
      <form>
        <Input type="email" placeholder="Email address" />
        <Input type="password" placeholder="Your password" />
        <PrimaryButton size={'full'}>Sign up</PrimaryButton>
      </form>
    </FormWrapper>
  )
}

export default SignupForm
