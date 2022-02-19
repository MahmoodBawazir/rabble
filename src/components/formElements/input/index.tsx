import React from 'react'

import { StyledField, StyledLabel, StyledError } from '../style'
import { StyledInput } from './style'

interface InputProps {
  id?: string
  name?: string
  type?: string
  label?: string
  children?: React.ReactNode
  defaultValue?: string
  value?: any
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  disabled?: boolean
  required?: boolean
  error?: string
  autocomplete?: string
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  label,
  value,
  defaultValue,
  placeholder,
  onChange,
  autocomplete,
  required,
  disabled,
  error,
  ...rest
}) => {
  return (
    <StyledField {...rest}>
      <StyledLabel>
        <StyledInput
          id={id}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          autocomplete={autocomplete}
          required={required}
        />
      </StyledLabel>
      {error && <StyledError>{error}</StyledError>}
    </StyledField>
  )
}

export default Input
