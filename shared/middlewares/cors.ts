import cors from 'cors'
import { __PROD__ } from '../constants'

export const corsOptions = {
  origin: __PROD__ ? ['https://rabbleacademy.xyz'] : [/localhost/],
  credentials: true,
}

export default cors(corsOptions)
