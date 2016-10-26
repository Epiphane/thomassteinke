var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
   componentDidMount: function() {
      this.navbarHeight = 0;

      var parallaxHeader = document.getElementById('parallax-header');
      var navbar         = document.getElementById('navbar');

      if (parallaxHeader) this.navbarHeight += parallaxHeader.offsetHeight - navbar.offsetHeight;
      else                this.navbarHeight = 0;

      window.onscroll = this.windowScrolled;

      this.windowScrolled();
   },

   windowScrolled: function() {
      this.setState({
         scroll: (window.pageYOffset > this.navbarHeight)
      });
   },

   render: function() {
      var state = this.state || {};

      return (
         <div id="navbar" className={'navbar navbar-fixed-top ' + (this.props.light ? 'light' : 'dark') + (state.scroll ? ' scroll' : '')} role="navigation">
            <div className="container">
               <div className="navbar-header pull-left">
                  <div className="collapse navbar-collapse">
                     <Router.Link className="navbar-brand" to="/">Thomas Steinke</Router.Link>
                  </div>
               </div>
               <ul className="nav navbar-nav">
                  <li className="visible-xs">
                      <Router.Link to="/">Steinke</Router.Link></li>
                  <li><Router.Link to="/games">Games</Router.Link></li>
                  <li><Router.Link to="/resume">Resume</Router.Link></li>
                  <li><Router.Link to="/contact">About Me</Router.Link></li>
                  <li><Router.Link to="/blog">Blog</Router.Link></li>
               </ul>
            </div>
         </div>
      );
   }
});
