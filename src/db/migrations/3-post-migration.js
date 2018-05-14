module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PostId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Posts',
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      viewCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      answerCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      commentCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      favoriteCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      closedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, /*Sequelize*/) => {
    return queryInterface.dropTable('Posts');
  }
};
