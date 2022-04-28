import React from 'react'
import { Formik, Form, Field, FieldProps } from 'formik'
import { string, object, mixed } from 'yup'

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
  file?: object
}

const validationSchema = object({
  displayName: string().required('Enter a display name'),
  email: string()
    .email('Must contain a valid email address')
    .required('Enter an email address'),
  file: mixed(),
})

const EditProfileForm: React.FC<Props> = ({ user }) => {
  const [editUser] = useEditUserMutation()

  const initialValues: FormValues = {
    displayName: user.displayName,
    email: user.email,
    file: undefined,
  }

  const onFileChange = (e: any, { setFieldValue }: { setFieldValue: any }) => {
    let reader = new FileReader()
    let file = e.target.files[0]

    if (!file) return

    reader.onloadend = () => {
      setFieldValue('file', file)
    }

    if (file) {
      // console.log('!!!!!', file)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      setSubmitting(true)

      console.log('values', values)
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
        {({ isSubmitting, setFieldValue }) => (
          <Form noValidate method="post">
            <div>
              <AvatarImage
                src={user.photoUrl || '/images/default_profile_photo.png'}
              />
              <input
                type="file"
                name="file"
                onChange={(e) => onFileChange(e, { setFieldValue })}
              />
            </div>

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
