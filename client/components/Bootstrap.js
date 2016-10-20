var React = require('react');
var Router = require('react-router');

var Bootstrap = module.exports = {};

Bootstrap.Row = React.createClass({
   render: function() {
      return (
         <div className="row">
            { this.props.children }
         </div>
      );
   }
});

Bootstrap.Full = React.createClass({
   render: function() {
      return (
         <div className="col-xs-12">
            { this.props.children }
         </div>
      );
   }
});