import styled from 'styled-components'

import theme from 'theme'

export const CenterDiv = styled.div`
  min-height: calc(100vh - 125px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${theme.colors.gradient};
`

export const Card = styled.div`
  width: 420px;
  background: ${theme.colors.common.white};
  border: 1px solid #edf3ff;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 35px;
`

export const CardTitle = styled.h1`
  color: ${theme.colors.common.white};
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  margin-bottom: 30px;
  text-align: center;
`

export const CardSubheading = styled.p`
  font-size: 15px;
  line-height: 18px;
  margin-bottom: 15px;
`

export const CardNote = styled.p`
  color: ${theme.colors.common.white};
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.2px;
  margin-top: 15px;

  a {
    display: inline-block;
    text-decoration: underline;
    font-weight: 500;
  }
`
