var React = require('react');
var Router = require('react-router');
var Auth = require('../../scripts/auth');
var Admin = require('../../components/Admin');
var Panel = Admin.Panel;
var BS = require('../../components/Bootstrap');

var BlogEditTitle = React.createClass({
   getInitialState: function() {
      return {
         title: this.props.title || ''
      };
   },

   submit: function(e) {
      e.preventDefault();

      this.props.submit({ title: this.state.title });
   },

   title: function(e) {
      this.setState({ title: e.target.value });
   },

   componentWillReceiveProps: function(nextProps) {
      this.setState({ title: nextProps.title });
   },

   render: function() {
      return (
         <Admin.FullPanel>
            <Admin.PanelTitle icon="edit" title="Title" />
            <Admin.PanelBody>
               <form onSubmit={this.submit} id={this.props.id}>
                  <div className="form-group row">
                     <div className="col-xs-10">
                        <input type="text" 
                           className="form-control input-sm" 
                           placeholder="Title" 
                           onChange={this.title}
                           value={this.state.title} />
                     </div>

                     <div className="col-xs-2">
                        <input type="submit" className="col-xs-12 btn btn-primary btn-sm" value="Save" />
                     </div>
                  </div>
               </form>
            </Admin.PanelBody>
         </Admin.FullPanel>
      );
   }
});

var BlogEditBody = React.createClass({
   getInitialState: function() {
      return {
         html: this.props.html || ''
      };
   },

   submit: function(e) {
      e.preventDefault();

      this.props.submit({ html: this.state.html });
   },

   html: function(e) {
      this.setState({ html: e.target.value });
   },

   componentWillReceiveProps: function(nextProps) {
      this.setState({ html: nextProps.html });
   },

   render: function() {
      return (
         <Admin.FullPanel>
            <Admin.PanelTitle icon="edit" title="Body" />
            <Admin.PanelBody>
               <form onSubmit={this.submit} id={this.props.id}>
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
      );
   }
});

var BlogEdit = React.createClass({
   getInitialState: function() {
      return { post: { title: '' } };
   },

   componentDidMount: function() {
      var self = this;
      Auth.get('/api/blog/' + this.props.params.blogId)
         .then(function(res) {
            self.setState({ post: res });
         });
   },

   update: function(props) {
      Auth.put('/api/blog/' + this.props.params.blogId, {
         data: props
      });
   },

   render: function() {
      var self = this;

      return (
         <div className="container-fluid">
            <div className="row">
               <div className="col-lg-12">
                  <h1 className="page-header">
                     {this.state.post.title}&nbsp;
                     <small>Post #{this.props.params.blogId}</small>
                  </h1>
               </div>
            </div>

            <BlogEditTitle title={this.state.post.title} submit={this.update} />
            <BlogEditBody html={this.state.post.html} submit={this.update} />
         </div>
      );
   }
});

module.exports = BlogEdit;
