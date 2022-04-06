import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'

const MAX_AGE = 24 * 60 * 60 * 1000 * 30 // 1 month
const SECRET = process.env.SESSION_SECRET

const RedisStore = connectRedis(session)
const redis = new Redis(process.env.REDIS_URL)

export default session({
  store: new RedisStore({
    client: redis,
    disableTouch: true,
  }),
  secret: SECRET,
  cookie: {
    maxAge: MAX_AGE,
    httpOnly: true,
    sameSite: 'lax', // csrf
    secure: process.env.NODE_ENV === 'production', // cookie only works in https
  },
  resave: false,
  saveUninitialized: false,
})
