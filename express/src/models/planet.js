'use strict';
import {Sequelize} from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  const Planet = sequelize.define('Planet', {
    planetId: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    planetName: Sequelize.STRING,
    homeStar: Sequelize.STRING,
    mass: Sequelize.DOUBLE,
    radius: Sequelize.DOUBLE,
    distance: Sequelize.DOUBLE
  }, {
    sequelize,
    tableName: 'planet',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });
  Planet.associate = models => {
    Planet.hasMany(models.Satellite, {foreignKey: 'planetId', as: 'satellites'});
  };
  return Planet;
};
