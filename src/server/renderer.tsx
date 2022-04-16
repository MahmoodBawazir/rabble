import React from 'react'
import { StaticRouter } from 'react-router'
import express from 'express'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { SchemaLink } from '@apollo/client/link/schema'

import App from '../app'
import { getHeader, getFooter } from './template'
import schema from '../../api/graphql/schema'

const debug = require('debug')
const log = debug('server:renderer')

const renderer = async (req: express.Request, res: express.Response) => {
  log(`server-side render ${req.url}`)

  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  // allows you to perform GraphQL operations on a provided schema
  console.log('schemaLink', req.user)
  const schemaLink = new SchemaLink({
    schema,
    context: {
      user: req.user || null,
    },
  })

  const nonce =
    typeof res.locals.nonce === 'string' ? res.locals.nonce : undefined

  if (!nonce) throw new Error('Security nonce not set.')

  // Create an Apollo Client with a local network interface
  // use schema link for SSR
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: schemaLink,
  })
  const helmetContext: any = {}
  const routerContext = {}

  const sheet = new ServerStyleSheet()
  const frontend = sheet.collectStyles(
    <ApolloProvider client={client}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url} context={routerContext}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </ApolloProvider>
  )

  log('get data from tree')

  getDataFromTree(frontend)
    .then(() => {
      log('got data from tree')

      // console.log('apollo user', req.user)

      res.status(200)

      const data = client.extract()
      const { helmet } = helmetContext

      res.write(
        getHeader({
          metaTags:
            helmet.title.toString() +
            helmet.meta.toString() +
            helmet.link.toString(),
        })
      )

      const stream = sheet.interleaveWithNodeStream(
        renderToNodeStream(frontend)
      )

      stream.pipe(res, {
        end: false,
      })

      stream.on('end', () => {
        return res.end(
          getFooter({
            apolloState: data,
            nonce,
          })
        )
      })
    })
    .catch((err) => {
      sheet.seal()

      console.error(err)

      res.status(500)

      res.send(
        `<!DOCTYPE html>
          <html>
            <head>
              <title>rabble</title>
            </head>
            <body>
              <div class="page-not-found">
                <h1>404</h1>
              </div>
            </body>
          </html>`
      )
    })
}

export default renderer
