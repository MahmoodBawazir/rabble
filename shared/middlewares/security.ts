import express from 'express'
import helmet from 'helmet'
import { v4 } from 'uuid'

export default (
  app: express.Application,
  { enableNonce, enableCSP }: { enableNonce: boolean; enableCSP: boolean }
) => {
  // Removes the X-Powered-By header if it was set.
  app.disable('x-powered-by')

  // disables browsers' buggy cross-site scripting filter by setting the X-XSS-Protection header to 0
  app.use(helmet.xssFilter())

  // Sets "X-Frame-Options: DENY"
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  app.use(
    helmet.frameguard({
      action: 'deny',
    })
  )

  // Sets "X-Download-Options: noopen"
  app.use(helmet.ieNoOpen())

  // Sets "X-Content-Type-Options: nosniff"
  app.use(helmet.noSniff())

  // Sets the `script-src` directive to "'self' 'nonce-e33ccde670f149c1789b1e1e113b0916'" (or similar)
  if (enableNonce) {
    app.use(
      (
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.locals.nonce = v4()
        next()
      }
    )
  }

  if (enableCSP) {
    const httpConnectSrc =
      process.env.NODE_ENV === 'production' ? 'https:' : 'http:'
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ['https:', 'http:', "'self'", 'data:', 'blob:'],
          scriptSrc: [
            "'self'",
            (_req: any, res: any) => `'nonce-${res.locals.nonce}'`,
          ],
          connectSrc: [httpConnectSrc, 'ws:'],
        },
        // reportOnly: process.env.NODE_ENV === 'development',
      })
    )
  }
}
