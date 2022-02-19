import React from 'react'
import { StaticRouterContext } from 'react-router'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { ServerStyleSheet } from 'styled-components'

import App from '../app'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const cssLinksFromAssets = (
  assets: { [x: string]: { css: any[] } },
  entrypoint: string
) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset) => `<link rel="stylesheet" href="${asset}">`)
          .join('')
      : ''
    : ''
}

const jsScriptTagsFromAssets = (
  assets: { [x: string]: { js: any[] } },
  entrypoint: string,
  ...extra: string[]
) => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset) => `<script src="${asset}" ${extra.join(' ')}></script>`)
          .join('')
      : ''
    : ''
}

export const renderApp = (req: express.Request, res: express.Response) => {
  // Create the server side style sheet
  const sheet = new ServerStyleSheet()

  const context: StaticRouterContext = {}
  // When the app is rendered collect the styles that are used inside it
  const markup = renderToString(
    sheet.collectStyles(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    )
  )

  // Generate all the style tags so they can be rendered into the page
  const styleTags = sheet.getStyleTags()

  const html = `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Rabble</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${cssLinksFromAssets(assets, 'client')}
      <!-- Render the style tags gathered from the components into the DOM -->
      ${styleTags}
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, 'client', 'defer', 'crossorigin')}
  </body>
</html>`
  return { context, html }
}

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req: express.Request, res: express.Response) => {
    const { context, html } = renderApp(req, res)
    if (context.url) {
      res.redirect(context.url)
    } else {
      res.status(200).send(html)
    }
  })

export default server
