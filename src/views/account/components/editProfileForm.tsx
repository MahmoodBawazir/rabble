import React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import { string, object } from 'yup'

import { PrimaryButton } from 'components/button'
import { Input } from 'components/formElements'
import { UserInfoType } from '../../../../shared/models/user'
import useEditUserMutation from '../../../../shared/graphql/mutations/user/useEditUserMutation'
import { AvatarImage } from '../style'

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

const Avatar = ({ photoUrl }: any) => {
  return (
    <div>
      <AvatarImage src={photoUrl || '/images/default_profile_photo.png'} />
      <input type="file" name="photoUrl" />
    </div>
  )
}

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
        // TODO: temporary solution cause it makes extra network request
        // need to use a better method to update user cache after edit
        refetchQueries: ['getCurrentUser'],
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
            <Avatar photoUrl={user.photoUrl} />

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
