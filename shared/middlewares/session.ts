import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'

import { SESSION_SECRET, __PROD__ } from '../constants'

const MAX_AGE = 24 * 60 * 60 * 1000 * 30 // 1 month

const RedisStore = connectRedis(session)
const url = {
  host: 'rabble-apollo-cache-do-user-11568839-0.b.db.ondigitalocean.com',
  port: 25061,
  password: 'AVNS_t0LNh0oA4A3eDL2',
  keyPrefix: 'session-cache:',
  tls: {
    rejectUnauthorized: false,
  },
}
const redis = new Redis(url)

export default session({
  store: new RedisStore({
    client: redis,
    disableTouch: true,
  }),
  secret: SESSION_SECRET,
  cookie: {
    maxAge: MAX_AGE,
    httpOnly: true,
    sameSite: 'lax', // csrf
    secure: __PROD__, // cookie only works in https
  },
  resave: false,
  saveUninitialized: false,
})
