require('dotenv').config()

export const EMAIL_ADDRESS_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.rabbleacademy.io'
    : 'http://localhost:4000'

export const API_URL = `${SERVER_URL}/api`

export const FRONTEND_URL = 'http://localhost:3000'

export const SESSION_SECRET = process.env.SESSION_SECRET || ''