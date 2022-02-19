import styled from 'styled-components'

import { PrimaryButton } from 'components/button'
import theme from 'theme'

export const Intro = styled.section`
  background: ${theme.colors.gradient};
  color: ${theme.colors.common.white};
  min-height: calc(100vh - 125px);

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  h1 {
    font-weight: bold;
    font-size: 95px;
    line-height: 1.15;
    text-align: center;
    letter-spacing: 0.2px;
  }

  p {
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 30px;
  }
`

export const Button = styled(PrimaryButton)`
  width: 300px;
`
