import express, { Router, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
// import compression from 'compression'
import { createServer } from 'http'
import passport from 'passport'
import { graphqlUploadExpress } from 'graphql-upload'

import authRoutes from './routes/auth'
import initializePassport from './passport'
import apolloServer from './apollo-server'
import session from '../shared/middlewares/session'
import addSecurityMiddleware from '../shared/middlewares/security'
import cors, { corsOptions } from '../shared/middlewares/cors'
import { FRONTEND_URL } from '../shared/constants'

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

  // app.use(compression())
  app.use(cors)
  // app.options('*', cors)
  app.use(cookieParser())

  app.use(session)

  app.use(passport.initialize())
  app.use(passport.session())

  // Routes
  app.use('/auth', authRoutes)
  app.use('/api', apiRouter)

  await apolloServer.start()

  // must be called before `applyMiddleware`
  app.use(graphqlUploadExpress())

  apolloServer.applyMiddleware({ app, path: '/api', cors: corsOptions })

  // redirect to frontend
  app.use('/', (_req: Request, res: Response) => {
    res.redirect(FRONTEND_URL)
  })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )

  console.log(
    `🚀 Server running at http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
}

startApolloServer()
