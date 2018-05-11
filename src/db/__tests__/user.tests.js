import { createUser, fetchUser, verifyPassword, verifyLogin } from '../util/user'
import db from '../models'

const User = db.User;

const clearDatabase = (done) => {
  User.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  .finally(done);
}

afterAll(() => db.sequelize.close());

describe('Test createUser', () => {
  beforeEach(clearDatabase);

  test('Should create a new item in the database with valid input', (done) => {
    const username = 'TEST_USER';
    const email = 'test@gmail.com';
    const password = '123456789';

    createUser({
       username,
       email,
       password
    })
    .then(() => User.findOne({
      where: {username}
    }))
    .then((user) => expect(user.email).toBe('test@gmail.com'))
    .finally(done);
  })

  test('Should not create a user if email is not valid', (done) => {
    const username = 'TEST_USER';
    const email = 'not an email';
    const password = '123456789';

    createUser({
      username,
      email,
      password
    })
    .then(() => {
      throw new Error('should not have created user')
    })
    .catch((err) => expect(err).toBeTruthy)
    .finally(done);
  })

  test('Usernames should be unique', (done) => {
    const newUser = {
      username: 'TEST_USER',
      email: 'test@gmail.com',
      password: '123456789'
    };

    createUser(newUser)
      .then(() => createUser(newUser))
      .then(() => {
        throw new Error('usernames are not unique');
      })
      .catch((err) => expect(err).toBeTruthy)
      .finally(done);
  })

  test('Passwords should be hashed', (done) => {
    const username = 'TEST_USER';
    const email = 'test@gmail.com';
    const password = '123456789';

    createUser({
       username,
       email,
       password
    })
    .then(() => User.findOne({
      where: {username}
    }))
    .then((user) => expect(user.password === '123456789').toBe(false))
    .finally(done);
  })
})

describe('Test fetchUser', () => {
  beforeEach(clearDatabase);

  test('Should get user from database', (done) => {
    const username = 'TEST_USER';
    const email = 'test@gmail.com';
    const password = '123456789';

    User.create({
      username,
      email,
      password
    })
    .then(() => fetchUser(username))
    .then((user) => expect(user.email).toBe(email))
    .catch((err) => {
      throw new Error(err)
    })
    .finally(done);
  })
});

describe('Test verifyPassword', () => {
  
  const username = 'TEST_USER2';
  const email = 'test2@gmail.com';
  const password = '1234567890';
  
  function beforeVerifyTest(done) {
    User.create({
      username,
      email,
      password
    })
    .catch((err) => {
      throw new Error(err);
    })
    .finally(done)
  }
  
  beforeAll(beforeVerifyTest);
  afterAll(clearDatabase);

  test('correct password should return a truthy value', (done) => {
    fetchUser(username)
    .then((user) => verifyPassword(password, user.password))
    .catch(() => expect(false).toBeTruthy)
    .finally(done);
  });

  test('incorrect password should return a falsy value', (done) => {
    fetchUser(username)
    .then((user) => verifyPassword('wrong password', user.password))
    .catch(() => expect(false).toBeTruthy)
    .finally(done);
  });
});

describe('Test VerifyLogin', () => {
  const username = 'TEST_USER2';
  const email = 'test2@gmail.com';
  const password = '1234567890';
  
  function beforeVerifyTest(done) {
    User.create({
      username,
      email,
      password
    })
    .catch((err) => {
      throw new Error(err);
    })
    .finally(done)
  }
  
  beforeAll(beforeVerifyTest);
  afterAll(clearDatabase);

  test('correct login info should return the user', (done) => {
    verifyLogin(username, password)
    .then(user => {
      expect(user.username).toBe(username);
      expect(user.email).toBe(email);
      done();
    })
    .catch((err) => {
      expect(false).toBeTruthy;
      done();
    })
  });

  test('incorrect username should throw an error', (done) => {
    
    verifyLogin('wrongname', password)
    .then(() => {
      expect(false).toBeTruthy;
      done();
    })
    .catch((err) => {
      expect(err).toBeTruthy;
      done();
    })
  })

  test('incorrect password should throw an error', (done) => {
    verifyLogin(username, 'wrongpassword')
    .then(() => {
      expect(false).toBeTruthy;
      done();
    })
    .catch((err) => {
      expect(err).toBeTruthy;
      done();
    })
  })
})
