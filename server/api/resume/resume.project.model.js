'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_project', {
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
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tag: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: DataTypes.TEXT
  });
};
