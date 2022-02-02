import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Home from './views/home'
import theme from './theme'
import GlobalStyles from './theme/reset.css.js'

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Switch>
        <Route exact={true} path="/" component={Home} />
      </Switch>
    </>
  </ThemeProvider>
)

export default App
