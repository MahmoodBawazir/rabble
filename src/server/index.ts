import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'

import renderer from './renderer'
import addSecurityMiddleware from '../../shared/middlewares/security'
import passport from 'passport'
import session from '../../shared/middlewares/session'
import cors from '../../shared/middlewares/cors'

const server = express()

// trust the proxy
server.set('trust proxy', true)
// parse incoming requests with JSON
server.use(express.json())
// security middleware
addSecurityMiddleware(server, { enableNonce: true, enableCSP: true })
// compress response bodies
server.use(compression())
// enable cors across all origins
server.use(cors)
server.options('*', cors)
// parse Cookie header, populate req.cookies
server.use(cookieParser('anything'))

server.use(session)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user: any, done) {
  return done(null, user)
})

server.use(passport.initialize())
server.use(passport.session())

// serve static files from the public directory
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR!))

server.get('*', renderer)

export default server
