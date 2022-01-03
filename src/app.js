import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './views/home'

const App = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
  </Switch>
)

export default App
