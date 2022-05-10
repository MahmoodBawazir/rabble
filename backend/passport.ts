import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import argon2 from 'argon2'

import { getUserByEmail } from './services/user'

const initPassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email: string, password: string, done: Function) => {
        const user = await getUserByEmail(email)

        if (!user) {
          return done(null, false, {
            message: `User with email ${email} does not exist`,
          })
        }

        const valid = await argon2.verify(user.password, password)

        if (!valid) {
          return done(null, false, { message: `Incorrect password provided` })
        }

        done(null, user)

        return user
      }
    )
  )

  passport.serializeUser(function (user, done: Function) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done: Function) {
    return done(null, user)
  })
}

export default initPassport
