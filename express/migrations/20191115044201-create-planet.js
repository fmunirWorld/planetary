'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('planet', {
      planet_id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      planet_name: Sequelize.STRING,
      home_star: Sequelize.STRING,
      mass: Sequelize.DOUBLE,
      radius: Sequelize.DOUBLE,
      distance: Sequelize.DOUBLE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('planet');
  }
};
