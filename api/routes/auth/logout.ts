import { Router } from 'express'

const logoutRouter = Router()

logoutRouter.get('/', (req, res) => {
  req.logout()
  return res.redirect('http://localhost:3000')
})

export default logoutRouter
