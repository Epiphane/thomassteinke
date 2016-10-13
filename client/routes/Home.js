var React = require('react');

var HomeLink = React.createClass({
   render: function() {
      if (!this.props.icon) {
         return (
            <a><span>{this.props.tag}</span></a>
         );
      }
      return (
         <a>
            <span>{this.props.tag}</span>
            <i className={'fa fa-' + this.props.icon}></i>
         </a>
      );
   }
});

var HomeTagline = React.createClass({
   render: function() {
      return (
         <h6 className="sub title text-center">
            <HomeLink tag="Game Maker" icon="gamepad"></HomeLink>
            <HomeLink tag="Web Developer" icon="laptop"></HomeLink>
            <HomeLink tag="Good Guy" className="hidden-xs"></HomeLink>
         </h6>
      );
   }
});

var NavBar = require('../components/NavBar');
var HomeCanvas = require('../components/Home-Canvas');

var Home = React.createClass({
   contextTypes: {
      router: React.PropTypes.object.isRequired
   },

   componentWillMount: function() {
      if (this.props.location.pathname.length > 1) {
         this.context.router.push('/');
      }  
   },

	render: function() {
		return (
         <div>
            <NavBar />

            <div className="container home">
               <h1 className="title text-center">Thomas Steinke</h1>
               <HomeTagline></HomeTagline>
            </div>

            <HomeCanvas></HomeCanvas>
         </div>
		);
	}
});

module.exports = Home;
