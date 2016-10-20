'use strict';

var sqldb = require('../server/sqldb');

sqldb.User.sync({ force: true })
  .then(function() {
    return sqldb.User.create({
      role: 'admin',
      name: 'Thomas Steinke',
      email: 'exyphnos@gmail.com',
      password: 'thomas'
    })
  });
