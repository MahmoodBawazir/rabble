require('dotenv').config()

export const __PROD__ = process.env.NODE_ENV === 'production'

export const __FORCE_DEV__ = process.env.FORCE_DEV === 'true'

export const EMAIL_ADDRESS_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export const SERVER_URL = __PROD__ ? '' : 'http://localhost:4000'

export const API_URL = __PROD__ ? '/api' : `${SERVER_URL}/api`

export const FRONTEND_URL = __PROD__
  ? 'https://rabbleacademy.xyz'
  : 'http://localhost:3000'

export const SESSION_SECRET = process.env.SESSION_SECRET || ''

export const REDIS_URL = process.env.REDIS_URL
