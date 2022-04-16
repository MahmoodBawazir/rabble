import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'

import { REDIS_URL, SESSION_SECRET } from '../constants'

const MAX_AGE = 24 * 60 * 60 * 1000 * 30 // 1 month

const RedisStore = connectRedis(session)
const redis = new Redis(REDIS_URL)

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
    secure: process.env.NODE_ENV === 'production', // cookie only works in https
  },
  resave: false,
  saveUninitialized: false,
})
