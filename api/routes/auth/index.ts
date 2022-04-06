// @flow
import { Router } from 'express'
import localAuthRouters from './local'
import logoutRouter from './logout'

const authRouter = Router()

authRouter.use('/email', localAuthRouters)
authRouter.use('/logout', logoutRouter)

export default authRouter
