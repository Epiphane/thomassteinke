var React = require('react');
var Router = require('react-router');
var Auth = require('../scripts/auth');

module.exports = React.createClass({
   contextTypes: {
      router: React.PropTypes.object.isRequired
   },

   getInitialState: function() {
      return { loggedIn: Auth.isLoggedIn() };
   },

   componentWillMount: function() {
      Auth.Component = this;
   },

   render: function() {
      return (
         <Router.Link to="/admin" id="auth-button">
            <i className="fa fa-cog"></i>
         </Router.Link>
      );
   }
});
