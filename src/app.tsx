import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import HomePage from 'views/home'
import SignupPage from 'views/signup'
import LoginPage from 'views/login'
import AccountPage from 'views/account'
import NotificationsPage from 'views/account/notifications'
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
        <Route exact={true} path="/account" component={AccountPage} />
        <Route path="/account/notifications" component={NotificationsPage} />
      </Switch>
    </>
  </ThemeProvider>
)

export default App
