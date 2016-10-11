var React = require('react'),
   ReactDOM = require('react-dom'),
   Router = require('react-router');

var App = React.createClass({
   componentDidMount: function() {
      document.body.style.backgroundColor = '#eeeeee';
   },

   render: function() {
      return this.props.children;
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

var routes = {
   Home: require('../routes/Home'),
   Games: require('../routes/Games'),
   Game: require('../routes/Game'),
   Contact: require('../routes/Contact'),
   Resume: require('../routes/Resume')
};

var routes = (
   <Router.Route name="app" path="/" component={App}>
      <Router.Route name="home" path="/" component={routes.Home}/>
      <Router.Route name="not-home" component={FooterPage}>
         <Router.Route name="game" path="/games/:gameName" component={routes.Game}/>
         <Router.Route name="games" path="/games" component={routes.Games}/>
         <Router.Route name="resume" path="/resume" component={routes.Resume}/>
         <Router.Route name="contact" path="/contact" component={routes.Contact}/>
      </Router.Route>
      <Router.IndexRoute component={routes.Home}/>
   </Router.Route>
);

ReactDOM.render((
   <Router.Router history={Router.browserHistory}>
      {routes}
   </Router.Router>
), document.getElementById('react_container'));
// Router.run(routes, Router.HistoryLocation, function (Handler) {
//    React.render(<Handler/>, document.body);
// });
