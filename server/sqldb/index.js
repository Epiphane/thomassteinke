/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');

var Sequelize = require('sequelize');

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// db.User = db.sequelize.import(path.join(
//   config.root,
//   'server',
//   'api',
//   'user',
//   'user.model'
// ));

// Insert models below
function full_path(name) {
  var args = [config.root, 'server', 'api'];
  var split = name.split('.');

  return path.join(config.root, 'server', 'api', split[0], name + '.model');
}

db.Game = db.sequelize.import(full_path('game'));
db.Game.Quote = db.sequelize.import(full_path('game.quote'));
db.Game.Showcase = db.sequelize.import(full_path('game.showcase'));

db.Resume = {
  Experience: db.sequelize.import(full_path('resume.experience')),
  Project: db.sequelize.import(full_path('resume.project')),
  Language: db.sequelize.import(full_path('resume.language')),
}

db.Game.hasMany(db.Game.Quote, { as: 'quotes' });
db.Game.hasMany(db.Game.Showcase, { as: 'showcase' });
// db.Property.belongsTo(db.User);

module.exports = db;
