var React = require('react');
var Router = require('react-router');
var Auth = require('../../scripts/auth');
var Admin = require('../../components/Admin');
var Panel = Admin.Panel;
var BS = require('../../components/Bootstrap');

var GameInfoFormObj = {
   getInitialState: function() {
      return this.props.game;
   },

   submit: function(e) {
      e.preventDefault();

      if (this.props.game.short_name)
         this.props.onSubmit();
   },

   render: function() {
      return (
         <form onSubmit={this.submit} id={this.props.id}>
            <div className="form-group row">
               <div className="col-xs-3">
                  <input type="text" 
                     className="form-control input-sm" 
                     placeholder="Title" 
                     onChange={this.title}
                     value={this.props.game.title} />
               </div>

               <div className="col-xs-3">
                  <div className="input-group">
                     <input type="text" 
                        className={'form-control input-sm ' + (this.props.game.short_name ? '' : 'alert-danger')}
                        placeholder="URL" 
                        onChange={this.short_name}
                        value={this.props.game.short_name} />
                  </div>
               </div>

               <div className="col-xs-3">
                  <div className="input-group">
                     <input type="text" 
                        className="form-control input-sm" 
                        placeholder="Link" 
                        onChange={this.link}
                        value={this.props.game.link} />
                  </div>
               </div>

               <div className="col-xs-3">
                  <div className="input-group">
                     <input type="text" 
                        className="form-control input-sm" 
                        placeholder="#000000" 
                        onChange={this.color}
                        value={this.props.game.color} />
                  </div>
               </div>
            </div>

            <div className="form-group row">
               <div className="col-xs-3">
                  <input type="text" 
                     className="form-control input-sm" 
                     placeholder="Authors" 
                     onChange={this.authors}
                     value={this.props.game.authors} />
               </div>

               <div className="col-xs-9">
                  <div className="input-group col-xs-12">
                     <input type="text" 
                        className="form-control input-sm" 
                        placeholder="desc" 
                        onChange={this.desc}
                        value={this.props.game.desc} />
                  </div>
               </div>
            </div>

            <div className="form-group row">
               <div className="col-xs-12">
                  <textarea className="form-control input-sm"
                     onChange={this.description}
                     value={this.props.game.description}></textarea>
               </div>
            </div>

            <div className="form-group row">
               <div className="col-xs-12">
                  <input type="submit" className="btn btn-primary btn-sm" value="Save" />
               </div>
            </div>
         </form>
      );
   }
};

['title', 'authors', 'color', 'desc', 'description', 'image', 'link', 'short_name'].forEach(function(prop) {
   GameInfoFormObj[prop] = function(e) {
      var obj = {};
          obj[prop] = e.target.value;
      this.props.game[prop] = obj[prop];
      this.forceUpdate();
   }
});

var GameInfoForm = React.createClass(GameInfoFormObj);

var GameItem = React.createClass({
   moveUp: function() {
      this.props.moveUp(this.props.index);
   },

   moveDown: function() {
      this.props.moveDown(this.props.index);
   },

   save: function() {
      console.log(this.props.game);

      Auth.patch('/api/game/' + this.props.game._id, {
         data: this.props.game
      }).then(function(res) {
         console.log(res);
      });

      this.forceUpdate();
   },

   render: function() {
      var game = this.props.game;

      var down = null, up = null;

      if (this.props.up) {
         up = (
            <button className="badge" onClick={this.moveUp}>
               <i className="fa fa-arrow-up"></i>
            </button>
         );
      }
      if (this.props.down) {
         down = (
            <button className="badge" onClick={this.moveDown}>
               <i className="fa fa-arrow-down"></i>
            </button>
         );
      }

      return (
         <div id={'game_' + game.order} order={game.order} className={'list-group-item ' + (this.props.active ? 'selected' : '')}>
            {down}
            {up}

            <Router.Link to={this.props.active ? '/admin/games' : '/admin/games/' + game.short_name}>
               <p>{game.order}. {game.title}</p>
            </Router.Link>

            <div className="row game_item_form" id={'game_item_' + game.short_name} style={{display: this.props.active ? 'block' : 'none'}}>
               <BS.Full>
                  <GameInfoForm game={game} onSubmit={this.save} />
               </BS.Full>
            </div>
         </div>
      );
   }
});

function createGenericGame(order) {
   return {
      title: '',
      authors: '',
      color: '#000000',
      desc: '',
      description: '',
      link: '',
      screenshots: 0,
      short_name: '',
      order: order
   };
}

var AdminGames = React.createClass({
   getInitialState: function() {
      return {
         games: _Games.find(),
         game: createGenericGame(_Games.find().length + 1)
      };
   },

   addNew: function() {
      var self = this;

      Auth.post('/api/game', {
         data: this.state.game
      }).then(function(res) {
         self.state.games.unshift(res);
         self.setState({ game: createGenericGame(self.state.games.length + 1) });

         self.forceUpdate();
      }).fail(function(err) {
         console.log(err);
      });
   },

   swap: function(i, j) {
      var self = this;

      var order = this.state.games[i].order;
      this.state.games[i].order = this.state.games[j].order;
      this.state.games[j].order = order;

      var t = this.state.games[i];
      this.state.games[i] = this.state.games[j];
      this.state.games[j] = t;

      Auth.patch('/api/game/' + this.state.games[i]._id, {
         data: {
            order: this.state.games[i].order
         }
      }).then(function(res) {
         Auth.patch('/api/game/' + self.state.games[j]._id, {
            data: {
               order: self.state.games[j].order
            }
         }).then(function(res) {
            console.log(res);
         });
      });
   },

   moveUp: function(index) {
      this.swap(index, index - 1);

      this.forceUpdate();
   },

   moveDown: function(index) {
      this.swap(index, index + 1);

      this.forceUpdate();
   },

   componentDidMount: function() {
      if (this.props.params.gameName) {
         $('#game_item_' + this.props.params.gameName).show().parent().addClass('selected');
      }
   },

   shouldComponentUpdate: function(nextProps, nextState) {
      return this.props.params.gameName !== nextProps.params.gameName;
   },

   componentWillUpdate: function(nextProps, nextState) {
      if (this.props.params.gameName !== nextProps.params.gameName) {
         // $('.game_item_form').slideUp().parent().removeClass('selected');

         if (nextProps.params.gameName) {
            // $('#game_item_' + nextProps.params.gameName).slideDown().parent().addClass('selected');
         }
      }
   },

   render: function() {
      var self = this;
      var activeGame = this.props.params.gameName;

      return (
         <div className="container-fluid">
            <div className="row">
               <div className="col-lg-12">
                  <h1 className="page-header">
                     Games <small>Games Overview</small>
                  </h1>
               </div>
            </div>

            <Admin.FullPanel>
               <Admin.PanelTitle icon="gamepad" title="Current Games" />
               <Admin.PanelBody>
                  <div className="list-group">
                     {
                        this.state.games.map(function(game, index) {
                           return (
                              <GameItem key={index} 
                                 index={index}
                                 game={game} 
                                 up={index > 0}
                                 down={index < self.state.games.length - 1}
                                 active={game.short_name === activeGame}
                                 moveUp={self.moveUp}
                                 moveDown={self.moveDown} />
                           );
                        })
                     }
                  </div>
               </Admin.PanelBody>
            </Admin.FullPanel>

            <Admin.FullPanel>
               <Admin.PanelTitle icon="plus" title="Add New Game" />

               <Admin.PanelBody>
                  <GameInfoForm game={this.state.game} onSubmit={this.addNew} />
               </Admin.PanelBody>
            </Admin.FullPanel>
         </div>
      );
   }
});

module.exports = AdminGames;
