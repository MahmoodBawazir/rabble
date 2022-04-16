import React from 'react'

import {
  StyledButton,
  StyledAnchorLink,
  StyledRouterLink,
  StyledPrimaryButton,
} from './style'

type To = {
  pathname?: string
  search?: string
  state?: object
}

export type Size = 'small' | 'medium' | 'large' | 'full'

export type Type = 'button' | 'submit'
interface ButtonProps {
  target?: string
  href?: string
  to?: string | To
  children: React.ReactNode
  disabled?: boolean
  isLoading?: boolean
  size?: Size
  type?: Type
}

const handleAnchorWrapping = (
  Component: React.FC<any>,
  props: Omit<ButtonProps, 'size'>
) => {
  const { href, to, target, children, disabled, isLoading, type, ...rest } =
    props

  const button = (
    <Component
      type={type || 'button'}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
    </Component>
  )

  if (href) {
    return (
      <StyledAnchorLink
        href={href}
        target={target || '_blank'}
        rel={!target ? 'noopener noreferrer' : undefined}
      >
        {button}
      </StyledAnchorLink>
    )
  }

  if (to) return <StyledRouterLink to={to}>{button}</StyledRouterLink>

  return button
}

export const Button: React.FC<ButtonProps> = (props) =>
  handleAnchorWrapping(StyledButton, props)

export const PrimaryButton: React.FC<ButtonProps> = (props) =>
  handleAnchorWrapping(StyledPrimaryButton, props)
