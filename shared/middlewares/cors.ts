import cors from 'cors'

export const corsOptions = {
  origin: [/localhost/],
  credentials: true,
}

export default cors(corsOptions)
