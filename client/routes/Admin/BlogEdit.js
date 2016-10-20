var React = require('react');
var Router = require('react-router');
var Auth = require('../../scripts/auth');
var Admin = require('../../components/Admin');
var Panel = Admin.Panel;
var BS = require('../../components/Bootstrap');

var Blog = React.createClass({
   getInitialState: function() {
      return {
         posts: []
      };
   },

   render: function() {
      var self = this;

      return (
         <div className="container-fluid">
            <div className="row">
               <div className="col-lg-12">
                  <h1 className="page-header">
                     Blog <small>Overview</small>
                  </h1>
               </div>
            </div>

            <Admin.FullPanel>
               <Admin.PanelTitle icon="edit" title="Posts" />
               <Admin.PanelBody>
                  <div className="list-group">
                     {
                        this.state.posts.map(function(post, index) {
                           return (
                              <div key={index}>{post.title}</div>
                           );
                        })
                     }
                  </div>
               </Admin.PanelBody>
            </Admin.FullPanel>
         </div>
      );
   }
});

module.exports = Blog;
