'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('satellite', {
      satellite_id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      satellite_name: Sequelize.STRING,
      is_regular: Sequelize.BOOLEAN,
      radius: Sequelize.DOUBLE,
      discovery_year: Sequelize.INTEGER,
      planet_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'Planet',
          key: 'planet_id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('satellite');
  }
};
