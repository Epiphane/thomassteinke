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
var BlogPost = sqldb.BlogPost;

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
  BlogPost.findAll({
    order: [
      ['_id', 'DESC']
    ],
    attributes: ['_id', 'title', 'createdAt', 'tags']
  })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Get a single game
exports.show = function(req, res) {
  BlogPost.find({
    where: {
      _id: req.params.id
    },
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Game in the DB.
exports.create = function(req, res) {
  BlogPost.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Game in the DB.
exports.update = function(req, res) {
  // Fix x-editable submission
  if (req.body._id) {
    delete req.body._id;
  }
  BlogPost.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

/*
// Deletes a Game from the DB.
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
