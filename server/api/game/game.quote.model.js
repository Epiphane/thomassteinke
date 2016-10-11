'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_quote', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quote: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author_name: DataTypes.STRING,
    author_link: DataTypes.STRING,
    author_tag: DataTypes.STRING,
  });
};
