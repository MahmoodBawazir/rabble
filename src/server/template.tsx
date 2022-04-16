import serialize from 'serialize-javascript'
import { html } from 'common-tags'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

const jsScriptTagsFromAssets = (
  assets: { [x: string]: { js: any[] } },
  entrypoint: string,
  nonce: string,
  ...extra: string[]
) => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map(
            (asset) =>
              `<script src="${asset}" ${extra.join(
                ' '
              )} nonce="${nonce}"></script>`
          )
          .join('')
      : ''
    : ''
}

export const getHeader = ({ metaTags }: { metaTags: Node }) => {
  // prettier-ignore
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${metaTags}
      </head>
      <body>
        <div id="root">`
}

export const getFooter = ({
  apolloState,
  nonce,
}: {
  apolloState: object
  nonce: string
}) => {
  return html`</div>
      <script nonce="${nonce}">window.__APOLLO_STATE__=${serialize(
    apolloState
  )}</script>
      ${jsScriptTagsFromAssets(assets, 'client', nonce, ' defer crossorigin')}
    </body>
  </html>
  `
}
