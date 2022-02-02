import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

import theme from './index'

const GlobalStyles = createGlobalStyle`
  ${reset};

  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;

    /* For crisp font */
    -webkit-text-size-adjust: none;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-font-smoothing: antialiased;
    font-family: ${theme.bodyFont};
  } 

  * {
    /* Remove tap highlight on iOS */
    -webkit-tap-highlight-color: transparent;

    margin: 0;
    padding: 0;
  }
`

export default GlobalStyles
