var React = require('react');
var Router = require('react-router');
var Auth = require('../../scripts/auth');
var Admin = require('../../components/Admin');
var Panel = Admin.Panel;
var BS = require('../../components/Bootstrap');

var BlogListItem = React.createClass({
   render: function() {
      var post = this.props.post;

      return (
         <Router.Link to={'/admin/blog/' + post._id} className="list-group-item">
            <i className="fa fa-edit"></i>
            &nbsp;
            {post.title}
         </Router.Link>
      );
   }
});

var Blog = React.createClass({
   getInitialState: function() {
      return {
         posts: []
      };
   },

   componentDidMount: function() {
      var self = this;
      Auth.fetch('/api/blog')
         .then(function(res) {
            self.setState({ posts: res.json });
         });
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
                     <Router.Link to="/admin/blog/new" className="list-group-item">
                        <i className="fa fa-plus"></i>
                        &nbsp;
                        Add new
                     </Router.Link>
                     {
                        this.state.posts.map(function(post, index) {
                           return (
                              <BlogListItem key={index} post={post}></BlogListItem>
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
