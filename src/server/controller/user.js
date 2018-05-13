import { User } from '../../db/models'

import passport from '../middleware/localPassport'
import log from '../utils/logger'


let controller = {
  post: {},
};

controller.post.signup = (req, res) => {
  return User.createUser(req.body)
    .then(() => {
      req.login(req.body, (err) => {
        if (err) {
          log.info('there was an error in automatic login', err);
          return res.status(401).send('User created but problem logging in');
        }
        return res.redirect('/');
      })
    })
    .catch((err) => {
      log.error('error processing sign up', err);
      res.status(401).send('There was a problem processing signup');
    });
};

controller.post.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}

controller.post.login = (req, res) => {
  
  passport.authenticate('local', (err, user, info) => {
    
    if (err || !user) {
      log.info('there was an error authenticating user', err)
      return res.status(422).send(info);
    }
    
    user = user.dataValues;

    delete user.password;
    delete user.salt;

    req.login(user, (err) => {
      if (err) {
        log.info('there was an error logging in user', err)
        return res.status(400).send('unable to log in user')
      }
      return res.json(user);
    })
  })(req, res)
}

export default controller