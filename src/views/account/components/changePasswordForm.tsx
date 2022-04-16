import React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import { string, object, ref } from 'yup'

import { PrimaryButton } from 'components/button'
import { Input } from 'components/formElements'
import { UserInfoType } from '../../../../shared/models/user'
import useChangePasswordMutation from '../../../../shared/graphql/mutations/user/useChangePasswordMutation'

interface Props {
  user: UserInfoType
}

interface FormValues {
  currentPassword: string
  newPassword: string
  newPassword2: string
}

const validationSchema = object().shape({
  currentPassword: string().required('You must enter your current password'),
  newPassword: string().required('This field is required'),
  newPassword2: string().when('newPassword', {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: string().oneOf([ref('newPassword')], 'Both passwords must match'),
  }),
})

const ChangePasswordForm: React.FC<Props> = ({ user }) => {
  const [changePassword] = useChangePasswordMutation()

  const initialValues: FormValues = {
    currentPassword: '',
    newPassword: '',
    newPassword2: '',
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      setSubmitting(true)

      await changePassword({
        variables: {
          input: values,
        },
      })
    } catch (err: any) {
      setErrors({ currentPassword: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2>Change password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form noValidate method="post">
            <Field name="currentPassword">
              {({
                field,
                meta: { error, value, initialValue, touched },
              }: FieldProps) => (
                <Input
                  type="password"
                  required
                  label={'Current Password'}
                  error={
                    (touched || value !== initialValue) && Boolean(error)
                      ? error
                      : ''
                  }
                  {...field}
                />
              )}
            </Field>
            <Field name="newPassword">
              {({
                field,
                meta: { error, value, initialValue, touched },
              }: FieldProps) => (
                <Input
                  type="password"
                  label={'New Password'}
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
            {values.newPassword && (
              <Field name="newPassword2">
                {({
                  field,
                  meta: { error, value, initialValue, touched },
                }: FieldProps) => (
                  <Input
                    type="password"
                    label={'Confirm Password'}
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
            )}

            <PrimaryButton type="submit" isLoading={isSubmitting}>
              Change
            </PrimaryButton>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ChangePasswordForm
