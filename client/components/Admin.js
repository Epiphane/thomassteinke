var React = require('react');
var Router = require('react-router');

var AdminComponents = module.exports = {};

AdminComponents.FullPanel = React.createClass({
   render: function() {
      return (
         <div className="row">
            <div className="col-xs-12">
               <div className="panel panel-default">
                  {this.props.children}
               </div>
            </div>
         </div>
      );
   }
});

AdminComponents.PanelTitle = React.createClass({
   render: function() {
      if (this.props.title) {
         return (
            <div className="panel-heading">
               <h3 className="panel-title">
                  <i className={'fa fa-fw fa-' + this.props.icon}></i> {this.props.title}
               </h3>
            </div>
         );
      }
      else {
         return (
            <div className="panel-heading">
               <h3 className="panel-title">
                  {this.props.children}
               </h3>
            </div>
         );
      }
   }
});

AdminComponents.PanelBody = React.createClass({
   render: function() {
      return (
         <div className="panel-body">
            {this.props.children}
         </div>
      );
   }
});