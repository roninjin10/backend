import bcrypt from 'bcrypt'
import Promise from 'bluebird'
import db from '../models'

const User = db.User;

Promise.promisifyAll(bcrypt);

export const createUser = (newUser) => User.create(newUser);

export const destroyUser = (username) => User.destroy({
  where: {username}
});

export const fetchUser = (username) => User.findOne({
  where: {username}
})

const verifyPassword = (password, hashedPassword) => bcrypt.compareAsync(password, hashedPassword)

export const verifyLogin = async (username, password) => {
  
  let user = await fetchUser(username);
  
  if (!user) {
    throw new Error('username does not exist');
  }

  const isMatch = await verifyPassword(password, user.password);

  if (!isMatch) {
    throw new Error('password is incorrect');
  }
  
  delete user.password;
  return user;
}

export const queryUsers = (query) => User.findAll({
  where: query,
  include: [{all: true}]
});