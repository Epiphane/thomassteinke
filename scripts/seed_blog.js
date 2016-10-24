'use strict';

var sqldb = require('../server/sqldb');

sqldb.BlogPost.sync({ force: true })
  .then(function() {
    return sqldb.BlogPost.create({
      title: 'Hello World',
      html: 'Hello world!',
      tags: ''
    })
  });
