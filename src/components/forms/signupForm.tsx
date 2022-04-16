import React, { useState } from 'react'
import axios from 'axios'

import { Input } from 'components/formElements'
import { PrimaryButton } from 'components/button'
import { FormWrapper } from './style'
import { SERVER_URL } from '../../../shared/constants'

const SignupForm: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value

    setEmail(emailValue)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value

    setPassword(passwordValue)
  }

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(
        `${SERVER_URL}/auth/email/signup`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )

      window.location.pathname = '/'
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormWrapper>
      <form noValidate method="post" onSubmit={create}>
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={onEmailChange}
        />
        <Input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={onPasswordChange}
        />
        <PrimaryButton type="submit" size={'full'} isLoading={loading}>
          Sign up
        </PrimaryButton>
      </form>
    </FormWrapper>
  )
}

export default SignupForm
