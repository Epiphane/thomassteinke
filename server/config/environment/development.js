'use strict';

// Development specific configuration
// ==================================
module.exports = {
  sequelize: {
    uri: process.env.DATABASE_URL,
    options: {
      dialog: 'mysql',
      logging: false,
      port: 3306
    }
  },

  seedDB: true
};
