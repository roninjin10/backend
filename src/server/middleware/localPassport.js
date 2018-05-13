import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from '../../db/models'

const localStrategy = (username, password, done) => {
  return User.verifyLogin(username, password)
  .then((user) => done(null, user))
  .catch((err) => done(null, false, err));
}

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user))

passport.use(new LocalStrategy(localStrategy));

export default passport