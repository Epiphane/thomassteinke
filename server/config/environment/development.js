'use strict';

// Development specific configuration
// ==================================
module.exports = {
  sequelize: {
    uri: 'mysql://root:root@localhost/thomassteinke',
    options: {
      dialog: 'mysql',
      logging: false,
      port: 3306
    }
  },

  seedDB: true
};
