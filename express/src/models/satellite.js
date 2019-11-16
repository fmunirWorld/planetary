'use strict';
import * as Sequelize from "sequelize";

module.exports = (sequelize, DataTypes) => {
  const Satellite = sequelize.define('Satellite', {
    satelliteId: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    satelliteName: Sequelize.STRING,
    isRegular: Sequelize.BOOLEAN,
    radius: Sequelize.DOUBLE,
    discoveryYear: Sequelize.INTEGER,
    planetId: Sequelize.INTEGER
  }, {
    sequelize,
    tableName: 'satellite',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });
  Satellite.associate = (models) => {
    Satellite.hasOne(models.Planet, {
      foreignKey: 'planetId',
      as: 'planet'
    });
  };
  return Satellite;
};
