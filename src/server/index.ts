import express from 'express'
import cookieParser from 'cookie-parser'
// import compression from 'compression'
import path from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware'
import passport from 'passport'

import renderer from './renderer'
import addSecurityMiddleware from '../../shared/middlewares/security'
import session from '../../shared/middlewares/session'
import cors from '../../shared/middlewares/cors'
import { __PROD__ } from '../../shared/constants'

const server = express()

// trust the proxy
server.set('trust proxy', true)

// security middleware
addSecurityMiddleware(server, { enableNonce: true, enableCSP: true })

server.use(
  ['/api', '/api/**'],
  createProxyMiddleware({
    target: 'https://api.rabbleacademy.xyz',
    changeOrigin: true,
  })
)

server.use(
  ['/auth', '/auth/**'],
  createProxyMiddleware({
    target: 'https://api.rabbleacademy.xyz',
    changeOrigin: true,
  })
)

// compress response bodies
// server.use(compression())
// parse incoming requests with JSON
server.use(express.json())
// enable cors across all origins
server.use(cors)
// server.options('*', cors)
// parse Cookie header, populate req.cookies
server.use(cookieParser())

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
server.use(
  express.static(__PROD__ ? './build' : path.join(__dirname, '../build/'), {
    index: false,
  })
)

server.get('*', renderer)

export default server
