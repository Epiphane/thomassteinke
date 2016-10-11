var React = require('react');
var Router = require('react-router');

var NavBar = require('../components/NavBar');
var LandingPage = require('../components/LandingPage');

var GameList = React.createClass({
   render: function() {
      var games = this.props.data.map(function(game) {
         return (
            <div className="col-md-6" key={game.short_name}>
               <div className="game-preview" style={{marginTop: '20px'}}>
                  <div className="game-image">
                     <Router.Link to={'/games/' + game.short_name}>
                        <img src={'/images/games/' + game.thumb} />
                     </Router.Link>
                  </div>
                  <h4 className="h4">
                     <Router.Link to={'/games/' + game.short_name}>
                        { game.title }
                     </Router.Link>
                  </h4>
                  <p className="game-description">
                     { game.desc }
                  </p>
                  <p className="game-links">
                     <Router.Link to={'/games/' + game.short_name}>
                     INFO
                     </Router.Link>
                  </p>
               </div>
            </div>
         );
      });

      return (
         <div className="container">
            <div className="row marketing">
               {games}
            </div>
         </div>
      );
   }
})

var Games = React.createClass({
	render: function() {
		return (
         <div>
            <NavBar light="true" />

   			<LandingPage page="Games" title="Games" />
            <GameList data={_Games.find()} />
		   </div>
      );
	}
});

module.exports = Games;
