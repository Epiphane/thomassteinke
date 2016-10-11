'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_experience', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: DataTypes.TEXT
  });
};
