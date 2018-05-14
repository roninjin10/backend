'use strict';

const viewData = require('../seed/8-views');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Views', viewData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Views', null, {});
  }
};