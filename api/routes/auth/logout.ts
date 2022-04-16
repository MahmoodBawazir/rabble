import { Router } from 'express'

import { FRONTEND_URL } from '../../../shared/constants'

const logoutRouter = Router()

logoutRouter.get('/', (req, res) => {
  req.logout()
  return res.redirect(FRONTEND_URL)
})

export default logoutRouter
