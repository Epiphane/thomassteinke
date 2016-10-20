var React = require('react');
var Router = require('react-router');
var Auth = require('../scripts/auth');

var Login = React.createClass({
   contextTypes: {
      router: React.PropTypes.object.isRequired
   },

   getInitialState: function() {
      return {email: '', password: ''};
   },

   onChangeEmail: function(e) {
      this.setState({ email: e.target.value });
   },

   onChangePassword: function(e) {
      this.setState({ password: e.target.value });
   },

   login: function(e) {
      var self = this;
      e.preventDefault();

      Auth.login(this.state.email, this.state.password)
         .then(function(success) {
            if (success) {
               self.context.router.push('/admin');
            }
         })
   },

   render: function() {
      return (
         <div>
            <Router.Link to="/" id="auth-button" style={{opacity: 1}}>
               <i className="fa fa-home"></i>
            </Router.Link>
            
            <div className="container marketing about-me"> 
               <div className="col-sm-8 col-sm-offset-2">
                  <form className="col-xs-12" onSubmit={this.login}>
                     <h1>Log In</h1>

                     <p className="input-group col-xs-12">
                        <input type="text" 
                           className="form-control" 
                           placeholder="Email" 
                           onChange={this.onChangeEmail} 
                           value={this.state.email} />
                     </p>
                     <p className="input-group col-xs-12">
                        <input type="password" 
                           className="form-control" 
                           placeholder="Password" 
                           onChange={this.onChangePassword} 
                           value={this.state.password} />
                     </p>
                     <input type="submit" className="btn btn-primary" value="Log in" />
                  </form>
               </div>
            </div>
         </div>
      );
   }
});

module.exports = Login;
