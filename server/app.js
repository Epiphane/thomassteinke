var sqldb = require('./sqldb');
var GameController = require('./api/game/game.controller');
var ResumeController = require('./api/resume/resume.controller');

var MockRes = function(onComplete, onFail) {
   this._status = 0;
   this._data = {};

   this.onComplete = onComplete;
   this.onFail = onFail;
}

MockRes.prototype.status = function(_status) { this._status = _status; return this; }
MockRes.prototype.json = function(json) { 
   this._data = json;

   if (this._status === 200 && this.onComplete) {
      this.onComplete(json);
   }
   else if (this._status !== 200) {
      this.onFail(json);
   }

   return this;
}
MockRes.prototype.end = function() { return this.json(null); }

module.exports = function(app) {
   // manually set up the dynamic javascript files
   app.get('/js/games.js', function(req, res) {
      GameController.index({}, new MockRes(function(games) {
         res.send('var _Games = (function() { return { find: function() { return ' + JSON.stringify(games) + '; } }; })()');
      }, function(err) {
         res.status(500).json(err);
      }));
   });
   app.get('/js/resume.js', function(req, res) {
      ResumeController.index({}, new MockRes(function(resume) {
         res.send('var _Resume = (function() { return Object.freeze(' + JSON.stringify(resume) + '); })()');
      }, function(err) {
         res.status(500).json(err);
      }));
   });

   app.use('/api/user', require('./api/user'));
   app.use('/api/game', require('./api/game'));
   app.use('/api/resume', require('./api/resume'));
   app.use('/auth', require('./auth'));
};