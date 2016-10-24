var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router'),
    Auth = require('./auth'),
    fetch = require('whatwg-fetch'),
    AuthButton = require('../components/AuthButton');

var App = React.createClass({
   componentDidMount: function() {
      document.body.style.backgroundColor = '#eeeeee';
   },

   render: function() {
      return this.props.children;
   }
});

var NonAdmin = React.createClass({
   render: function() {
      return (
         <div>
            <AuthButton />
            { this.props.children }
         </div>
      );
   }
});

var FooterPage = React.createClass({
   render: function() {
      return (
         <div>
            <div id="main-container">
               {this.props.children}
            </div>

            <div className="container bottom-margin">
               <div className="footer">
                  <span className="social pull-right">
                     <a href="mailto:exyphnos@gmail.com" className="btn btn-social-icon btn-google"><i className="fa fa-envelope"></i></a>
                     <a href="https://twitter.com/therealsteinke" target="_blank" className="btn btn-social-icon btn-twitter"><i className="fa fa-twitter"></i></a>
                     <a href="https://www.linkedin.com/in/thomsteinke" target="_blank" className="btn btn-social-icon btn-linkedin"><i className="fa fa-linkedin"></i></a>
                     <a href="https://github.com/Epiphane" target="_blank" className="btn btn-social-icon btn-github"><i className="fa fa-github"></i></a>
                  </span>
                  <div className="hidden-xs">Designed, coded, and spel-chequed by Thomas Steinke</div>
                  <div className="visible-xs">Thomas Steinke</div>
               </div>
            </div>
         </div>
      );
   }
});

var requireNoAuth = function(nextState, replace) {
   if (Auth.isLoggedIn()) {
      replace({
         pathname: '/admin',
         state: { nextPathname: nextState.location.pathname }
      });
   }
}

var requireAuth = function(nextState, replace) {
   if (!Auth.isLoggedIn()) {
      replace({
         pathname: '/login',
         state: { nextPathname: nextState.location.pathname }
      });
   }
}

var routes = {
   Home: require('../routes/Home'),
   Games: require('../routes/Games'),
   Game: require('../routes/Game'),
   Contact: require('../routes/Contact'),
   Resume: require('../routes/Resume'),
   Login: require('../routes/Login'),
   Admin: require('../routes/Admin'),
   AdminDashboard: require('../routes/Admin/Dashboard'),
   AdminGames: require('../routes/Admin/Games'),
   AdminBlog: require('../routes/Admin/Blog'),
   AdminBlogNew: require('../routes/Admin/BlogNew'),
   AdminBlogEdit: require('../routes/Admin/BlogEdit'),
};

var routes = (
   <Router.Route name="app" path="/" component={App}>
      <Router.Route name="admin" path="/admin" component={routes.Admin} onEnter={requireAuth}>
         <Router.Route name="admin_games" path="games" component={routes.AdminGames}/>
         <Router.Route name="admin_game" path="games/:gameName" component={routes.AdminGames}/>
         <Router.Route name="admin_blog" path="blog" component={routes.AdminBlog}/>
         <Router.Route name="admin_blog_new" path="blog/new" component={routes.AdminBlogNew}/>
         <Router.Route name="admin_blog_edit" path="blog/:blogId" component={routes.AdminBlogEdit}/>
         <Router.IndexRoute name="admin_dashboard" component={routes.AdminDashboard}/>
         <Router.Route path="*" component={routes.AdminDashboard}/>
      </Router.Route>

      <Router.Route name="non-admin" component={NonAdmin}>
         <Router.Route name="login" path="/login" component={routes.Login} onEnter={requireNoAuth}/>
         <Router.Route name="not-home" component={FooterPage}>
            <Router.Route name="game" path="/games/:gameName" component={routes.Game}/>
            <Router.Route name="games" path="/games" component={routes.Games}/>
            <Router.Route name="resume" path="/resume" component={routes.Resume}/>
            <Router.Route name="contact" path="/contact" component={routes.Contact}/>
         </Router.Route>

         <Router.IndexRoute name="home" component={routes.Home}/>
         <Router.Route path="*" component={routes.Home}/>
      </Router.Route>
   </Router.Route>
);

ReactDOM.render((
   <Router.Router history={Router.browserHistory}>
      {routes}
   </Router.Router>
), document.getElementById('react_container'));