var React = require('react');
var Router = require('react-router');

var NavBar = require('../components/NavBar');
var LandingPage = require('../components/LandingPage');

var Contact = React.createClass({
   render: function() {
      return (
         <div>
            <NavBar />

            <LandingPage page="contact" title="About Me" />
            <div className="container marketing about-me"> 
               <div className="col-sm-10 col-sm-offset-1">
                  <div className="info col-sm-6">
                     <h1>I'm Thomas Steinke.</h1>
                     <small className="hidden-xs">That's me, over on the right.</small>
                     <hr />
                     <p>
                     I'm a Software developer who makes games on the side, when I'm not busy playing them. Currently, I'm a fourth year Computer Science student, set to graduate December 2016.
                     </p>
                     <hr />
                     <h5>
                     Email: <a href="mailto:me@thomassteinke.com">me@thomassteinke.com</a>
                     </h5>
                     <h5>
                     Resume: <Router.Link to="/resume">Cool Version</Router.Link> (or <a href="/files/Resume.pdf" target="_self">PDF</a>)
                     </h5>
                  </div>
                  <div className="picture col-sm-6 hidden-xs">
                     <img src="/images/me.jpg" />
                  </div>
               </div>
            </div>
         </div>
      );
   }
});

module.exports = Contact;
