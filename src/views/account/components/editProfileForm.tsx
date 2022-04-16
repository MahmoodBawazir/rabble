import React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import { string, object } from 'yup'

import { PrimaryButton } from 'components/button'
import { Input } from 'components/formElements'
import { UserInfoType } from '../../../../shared/models/user'
import useEditUserMutation from '../../../../shared/graphql/mutations/user/useEditUserMutation'
import { Avatar } from '../style'

interface Props {
  user: UserInfoType
}

interface FormValues {
  displayName: string
  email: string
}

const validationSchema = object({
  displayName: string().required('Enter a display name'),
  email: string()
    .email('Must contain a valid email address')
    .required('Enter an email address'),
})

const EditProfileForm: React.FC<Props> = ({ user }) => {
  const [editUser] = useEditUserMutation()

  const initialValues: FormValues = {
    displayName: user.displayName,
    email: user.email,
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      setSubmitting(true)

      await editUser({
        variables: {
          input: values,
        },
      })
    } catch (err: any) {
      setErrors({ email: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2>Account</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate method="post">
            <Avatar />
            <Field name="displayName">
              {({
                field,
                meta: { error, value, initialValue, touched },
              }: FieldProps) => (
                <Input
                  type="text"
                  autoComplete="given-name"
                  required
                  error={
                    (touched || value !== initialValue) && Boolean(error)
                      ? error
                      : ''
                  }
                  {...field}
                />
              )}
            </Field>
            <Field name="email">
              {({
                field,
                meta: { error, value, initialValue, touched },
              }: FieldProps) => (
                <Input
                  type="email"
                  autoComplete="email"
                  required
                  error={
                    (touched || value !== initialValue) && Boolean(error)
                      ? error
                      : ''
                  }
                  {...field}
                />
              )}
            </Field>
            <PrimaryButton type="submit" isLoading={isSubmitting}>
              Save
            </PrimaryButton>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditProfileForm