var React = require('react');
var Router = require('react-router');
var Auth = require('../../scripts/auth');
var Admin = require('../../components/Admin');
var Panel = Admin.Panel;
var BS = require('../../components/Bootstrap');

var BlogNew = React.createClass({
   contextTypes: {
      router: React.PropTypes.object.isRequired
   },

   getInitialState: function() {
      return {
         title: '',
         html: '',
         tags: ''
      };
   },

   submit: function(e) {
      var self = this;
      e.preventDefault();

      Auth.post('/api/blog/', {
         data: this.state
      }).then(function() {
         self.context.router.push('/admin/blog');
      });
   },

   title: function(e) {
      this.setState({ title: e.target.value });
   },

   tags: function(e) {
      this.setState({ tags: e.target.value });
   },

   html: function(e) {
      this.setState({ html: e.target.value });
   },

   render: function() {
      var self = this;

      return (
         <div className="container-fluid">
            <div className="row">
               <div className="col-lg-12">
                  <h1 className="page-header">
                     New Blog Post
                  </h1>
               </div>
            </div>

            <Admin.FullPanel>
               <Admin.PanelTitle icon="edit" title="Post Info" />
               <Admin.PanelBody>
                  <form onSubmit={this.submit}>
                     <div className="form-group row">
                        <div className="col-xs-12">
                           <input type="text" 
                              className="form-control input-sm" 
                              placeholder="Title" 
                              onChange={this.title}
                              value={this.state.title} />
                        </div>
                     </div>

                     <div className="form-group row">
                        <div className="col-xs-12">
                           <input type="text" 
                              className="form-control input-sm" 
                              placeholder="Tags" 
                              onChange={this.tags}
                              value={this.state.tags} />
                        </div>
                     </div>

                     <div className="form-group row">
                        <div className="col-xs-6">
                           <textarea type="text" 
                              className="form-control input-sm" 
                              placeholder="HTML Body" 
                              onChange={this.html}
                              value={this.state.html} />
                        </div>

                        <div className="col-xs-6" dangerouslySetInnerHTML={{__html: this.state.html}}>
                        </div>
                     </div>

                     <div className="form-group row">
                        <div className="col-xs-12">
                           <input type="submit" className="btn btn-primary btn-sm" value="Save" />
                        </div>
                     </div>
                  </form>
               </Admin.PanelBody>
            </Admin.FullPanel>
         </div>
      );
   }
});

module.exports = BlogNew;
