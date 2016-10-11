var React = require('react');
var ReactBS = require('react-bootstrap');
var ReactDOM = require('react-dom');

var NavBar = require('../components/NavBar');
var LandingPage = require('../components/LandingPage');

var GameQuotes = React.createClass({
   render: function() {
      return (
         <div>
         {
            this.props.data.map(function(quote, index) {
               return (
                  <blockquote key={index}>
                    <p>{quote.quote}</p>
                    <footer><a target="_blank" href={quote.author_link}>{quote.author_name}</a> {quote.author_tag}</footer>
                  </blockquote>
               );
            })
         }
         </div>
      );
   }
});

var GameCaptures = React.createClass({
   render: function() {
      if (!this.props.data.length) return null;

      return (
         <ReactBS.Carousel interval={10000}>
            {
               this.props.data.map(function(image) {
                  return (
                     <ReactBS.Carousel.Item key={image}>
                        <img src={'/images/games/' + image} />
                     </ReactBS.Carousel.Item>
                  );
               })
            }
         </ReactBS.Carousel>
      );
   }
})

var GameShowcase = React.createClass({
   render: function() {
      return (
         <div className="text-center">
            {
               this.props.data.map(function(item, index) {
                  var child = (<div></div>);
                  if (item.image) {
                     child = (
                        <img src={item.image} />
                     );
                  }
                  else {
                     child = (
                        <h4>{item.text}</h4>
                     );
                  }

                  return (
                     <a target="_blank" href={ item.link } key={index}>
                        {child}
                     </a>
                  );
               })
            }
         </div>
      );
   }
});

var Game = React.createClass({
   componentDidMount: function() {
      document.getElementById('main-container').style.backgroundColor = this.game.color;
   },

   componentWillUnmount: function() {
      document.getElementById('main-container').style.backgroundColor = '#eeeeee';
   },

	render: function() {
      var self = this;

      var game = _Games.find().find(function(game) {
         return game.short_name === self.props.params.gameName;
      });
      this.game = game;

      var captures = [];

      for (var i = 0; i < game.screenshots; i ++) {
         captures.push(game.short_name + '-sc' + i + '.png');
      }

      var download = null;
      if (game.download) {
         download = (<a className="btn btn-primary bottom-margin" href="{ game.download }">Download</a>);
      }

      var link = null;
      if (game.link) {
         link = (<a target="_blank" href="{ game.link }" className="btn btn-primary">Game page</a>);
      }

		return (
         <div>
            <NavBar light="true" />

            <div className="top-gutter">
              <div className="game-info container">
                <div className="col-sm-8">
                  <h1 className="h1">{ game.title }</h1>
                  {download}
                  <p className="game-authors">{ game.authors }</p>
                  <h5 className="game-description">
                  {game.description}
                  </h5>

                  {link}

                  <hr />

                  <GameQuotes data={game.quotes || []} />

                  <GameCaptures data={captures} />

                </div>
                <div className="game-side col-sm-4 hidden-xs">
                  <div className="game-image">
                    <img src={'/images/games/' + game.image} />
                  </div>

                  <GameShowcase data={game.showcase || []} />
                </div>
              </div>
            </div>

		   </div>
      );
	}
});

module.exports = Game;
