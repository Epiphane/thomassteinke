var React = require('react');
var Router = require('react-router');
var Auth = require('../scripts/auth');

var links = [
    { icon: 'edit', text: 'Blog', link: '/blog'},
    { icon: 'bar-chart-o', text: 'Charts', link: '/charts'},
    { icon: 'gamepad', text: 'Games', link: '/games'},
    { icon: 'edit', text: 'Resume', link: '/resume'},
    { icon: 'user', text: 'About Me', link: '/about'}
];

var AdminSideNav = React.createClass({
   render: function() {
      var active = this.props.active;
      return (
         <ul className="nav navbar-nav side-nav">
            <li className={active === '' ? 'active' : ''}>
               <Router.Link to="/admin">
                  <i className="fa fa-fw fa-dashboard"></i> 
                  Dashboard
               </Router.Link>
            </li>
         {
            this.props.data.map(function(link, i) {
               return (
                  <li key={i} className={active.indexOf('/admin' + link.link) >= 0 ? 'active' : ''}>
                     <Router.Link to={'/admin' + link.link}>
                        <i className={'fa fa-fw fa-' + link.icon}></i> 
                        {link.text}
                     </Router.Link>
                  </li>
               );
            })
         }
         </ul>
      );
   }
});

module.exports = React.createClass({
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

   logout: function(e) {
      e.preventDefault();

      Auth.logout();
      this.context.router.push('/');
   },

   render: function() {
      return (
         <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="navbar-header">
               <Router.Link className="navbar-brand" to="/admin">TS Admin</Router.Link>
            </div>
            <ul className="nav navbar-right top-nav">
               <li>
                  <Router.Link to="/">
                     <i className="fa fa-home"></i>
                  </Router.Link>
               </li>
               <li className="dropdown">
                  <a href="#" onClick={this.logout}>
                     <i className="fa fa-user"></i> Log Out
                  </a>
               </li>
            </ul>
            <div className="collapse navbar-collapse navbar-ex1-collapse">
               <AdminSideNav data={links} active={this.props.active} />
            </div>
         </nav>
      );
   }
});
