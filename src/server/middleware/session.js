import session from 'express-session'

export default session({
  secret: 'good luck figuring out this secret ',
  resave: true,
  saveUninitialized: true,
  key: 'user_id',
  cookie: {
    secure: false,
    httpOnly: false,
  }
})