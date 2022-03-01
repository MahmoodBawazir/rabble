import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compression from 'compression'
import { v4 } from 'uuid'

import renderer from './renderer'

const server = express()

// trust the proxy
server.set('trust proxy', 1)
server.use(
  (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    response.locals.nonce = v4()
    next()
  }
)
// parse incoming requests with JSON
server.use(express.json())
// parse Cookie header, populate req.cookies
server.use(cookieParser())
// enable cors across all origins
server.use(cors())
// sets http headers for security
server.use(
  helmet({
    // disable csp for now until i can setup nonce
    contentSecurityPolicy: false,
  })
)
// compress response bodies
server.use(compression())

// security measure for production
server.disable('x-powered-by')

// serve static files from the public directory
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR!))

server.get('/*', renderer)

export default server
