'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_showcase', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    link: DataTypes.STRING,
    image: DataTypes.STRING,
    text: DataTypes.STRING
  });
};
