import express, { Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { createServer } from 'http'

import apolloServer from './apollo-server'

const PORT = process.env.PORT || 4000

const startApolloServer = async () => {
  const app = express()
  const apiRouter = Router()
  const httpServer = createServer(app)

  // Trust the proxy
  app.set('trust proxy', 1)
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  app.use(compression())

  app.use('/api', apiRouter)

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, path: '/api', cors: { origin: '*' } })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )

  console.log(
    `🚀 Server running at http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
}

startApolloServer()
