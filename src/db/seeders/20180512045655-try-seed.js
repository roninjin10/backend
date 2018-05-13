'use strict';
const userData = [
  {
    username: "kyle",
    password: "kyle",
    email: "email@email.com"
  },
  {
    username: "eric",
    password: "eric",
    email: "email@email.com"
  },
  {
    username: "will",
    password: "will",
    email: "email@email.com"
  },
  {
    username: "joe",
    password: "joe",
    email: "email@email.com"
  },
  {
    username: "nate",
    password: "nate",
    email: "email@email.com"
  },
  {
    username: "cindy",
    password: "cindy",
    email: "email@email.com"
  },
  {
    username: "test",
    password: "test",
    email: "email@email.com"
  }
];
const bcrypt = require('bcrypt');

module.exports = {
  
  up: (queryInterface, Sequelize) => {
    for(const user of userData) {
      user.password = bcrypt.hashSync(user.password, 8);
    }
    
    return queryInterface.bulkInsert('Users', userData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
