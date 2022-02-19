import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import HomePage from 'views/home'
import SignupPage from 'views/signup'
import LoginPage from 'views/login'
import theme from 'theme'
import GlobalStyles from 'theme/reset.css'

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </>
  </ThemeProvider>
)

export default App
