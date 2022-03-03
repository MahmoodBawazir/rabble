import React from 'react'
import { Router } from 'react-router'
import { hydrate } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import App from '../app'
import { history } from './history'

// Create an Apollo Client with a local network interface
const cache = new InMemoryCache()

// use HttpLink for client
// apollo uses HttpLink by default when `uri` is provided
const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: window.__DATA__ ? cache.restore(window.__DATA__) : cache,
  // skip force-fetching (queries using network-only or cache-and-network) during initialization.
  // this way, even those queries initially run using only the cache
  ssrForceFetchDelay: 100,
  // prevent sending duplicate queries to the serverr
  queryDeduplication: true,
})

hydrate(
  <HelmetProvider>
    <ApolloProvider client={client}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloProvider>
  </HelmetProvider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
