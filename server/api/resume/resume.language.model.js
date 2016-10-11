'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resume_language', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pretty_name: DataTypes.STRING,
    proficiency: DataTypes.INTEGER
  });
};
