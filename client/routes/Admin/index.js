var React = require('react');
var Router = require('react-router');
var AdminNavBar = require('../../components/AdminNavBar');

var Admin = React.createClass({
   render: function() {
      return (
         <div className="admin">
            <div id="wrapper">
               <AdminNavBar active={this.props.location.pathname} />

               <div id="page-wrapper">
                  { this.props.children }
               </div>
            </div>
         </div>
      );
   }
});

module.exports = Admin;
