/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /properties              ->  index
 * POST    /properties              ->  create
 * GET     /properties/:id          ->  show
 * PUT     /properties/:id          ->  update
 * DELETE  /properties/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var config = require(__dirname + '/../../config/environment');
var sqldb = require('../../sqldb');
var Resume = sqldb.Resume;
var Experience = sqldb.Resume.Experience;
var Project = sqldb.Resume.Project;
var Language = sqldb.Resume.Language;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).json(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.send(404);
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          return res.send(204);
        });
    }
  };
}

// Get list of games
exports.index = function(req, res) {
  Experience.findAll({
    order: [
      ['_id', 'DESC']
    ]
  })
    .then(function(exp) {
      return Project.findAll({
        order: [
          ['_id', 'DESC']
        ]
      })
        .then(function(proj) {
          return Language.findAll({
            order: [
              ['_id', 'DESC']
            ]
          })
            .then(function(lang) {
              return {
                experience: exp,
                projects: proj,
                languages: lang
              };
            });
        });
    })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Get a single property
exports.show = function(req, res) {
  Game.find({
    where: {
      $or: [{short_name: req.params.name}, {_id: req.params.name}]
    },
    include: [{ model: Quote, as: 'quotes' }, { model: Showcase, as: 'showcase' }]
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

/*
// Creates a new property in the DB.
exports.create = function(req, res) {
  if(!req.body.imageURL) {
    req.body.imageURL = 'https://s3-us-west-2.amazonaws.com/pr-properties/no-image.png';
  }

  Property.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing property in the DB.
exports.update = function(req, res) {
  // Fix x-editable submission
  if(req.body.pk) {
    req.body[req.body.name] = req.body.value;
    delete req.body.name;
    delete req.body.value;
    delete req.body.pk;
  }

  if (req.body._id) {
    delete req.body._id;
  }
  Property.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a property from the DB.
exports.destroy = function(req, res) {
  Property.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};*/
