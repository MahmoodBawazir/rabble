import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { createServer } from 'http'
import passport from 'passport'

import authRoutes from './routes/auth'
import initializePassport from './passport'

import apolloServer from './apollo-server'
import session from '../shared/middlewares/session'
import addSecurityMiddleware from '../shared/middlewares/security'
import cors, { corsOptions } from '../shared/middlewares/cors'

const PORT = process.env.PORT || 4000

const startApolloServer = async () => {
  initializePassport()

  const app = express()
  const apiRouter = Router()
  const httpServer = createServer(app)

  // Trust the proxy
  app.set('trust proxy', true)
  app.use(express.json())

  // security middleware
  addSecurityMiddleware(app, { enableNonce: false, enableCSP: false })

  app.use(compression())
  app.use(cors)
  app.options('*', cors)
  app.use(cookieParser('anything'))

  app.use(session)

  app.use(passport.initialize())
  app.use(passport.session())

  // Routes
  app.use('/auth', authRoutes)
  app.use('/api', apiRouter)

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, path: '/api', cors: corsOptions })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )

  console.log(
    `🚀 Server running at http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
}

startApolloServer()
