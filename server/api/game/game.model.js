'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    short_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    screenshots: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    title: DataTypes.STRING,
    thumb: DataTypes.STRING,
    image: DataTypes.STRING,
    link: DataTypes.STRING,
    color: DataTypes.STRING,
    authors: DataTypes.STRING,
    desc: DataTypes.STRING,
    description: DataTypes.TEXT,
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  });
};
