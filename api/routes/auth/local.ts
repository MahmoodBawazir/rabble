import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import argon2 from 'argon2'

import { createUser, getUserByEmail } from '../../services/user'

const localAuthRouter = Router()

localAuthRouter.post(
  '/signup',
  async function (req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    if (await getUserByEmail(email)) {
      return next(`User with email ${email} already exists`)
    }

    const hashedPassword = await argon2.hash(password)

    let user: any

    try {
      user = await createUser({ input: { email, password: hashedPassword } })
    } catch (err) {
      console.error(err)
    }

    req.login(user, function (err) {
      if (err) {
        return next(err)
      }

      res.send(user)
    })

    return user
  }
)

localAuthRouter.post(
  '/login',
  passport.authenticate('local'),
  function (req: Request, res: Response) {
    // console.log('login route', req.user)
    return res.send(req.user)
  }
)

export default localAuthRouter
