'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blog_post', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    html: DataTypes.TEXT,
    tags: DataTypes.STRING
  });
};
