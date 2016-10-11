var React = require('react');

var NavBar = require('../components/NavBar');
var LandingPage = require('../components/LandingPage');

var width_height_100 = {width: '100%', height: '100%'};

var Details = React.createClass({
   render: function() {
      return (
         <div className="details">
            <ul>
            {
               this.props.data.map(function(det, i) {
                  return (
                     <li key={i}>{det}</li>
                  );
               })
            }
            </ul>
         </div>
      );
   }
})

var ResumeExperience = React.createClass({
   render: function() {
      return (
         <div>
         {
            this.props.data.map(function(item) {
               return (
                  <div className="item col-xs-12" key={item.title}>
                     <div className="col-sm-10 no-gutter">
                        <h3>{ item.title }</h3>
                        <h6>{ item.position } | { item.time }</h6>
                        <Details data={ JSON.parse(item.details) } />
                     </div>
                     <div className="col-sm-2 no-gutter pull-right hidden-xs">
                        <img src={'/images/resume/' + item.image} />
                     </div>
                  </div>
               );
            })
         }
         </div>
      );
   }
});

var ResumeProjects = React.createClass({
   render: function() {
      return (
         <div>
            <a href="/games">
               <div className="btn btn-secondary item col-xs-12">
                  See My Games
               </div>
            </a>
         {
            this.props.data.map(function(item) {
               return (
                  <div className="item col-xs-12" key={item.title}>
                     <div className="col-sm-10 no-gutter">
                        <h3><a href={ item.link } target="_blank">{ item.title }</a></h3>
                        <h6>{ item.tag }</h6>
                        <Details data={ JSON.parse(item.details) } />
                     </div>
                     <div className="col-sm-2 no-gutter pull-right hidden-xs">
                        <img src={'/images/resume/' + item.image} />
                     </div>
                  </div>
               );
            })
         }
         </div>
      );
   }
});

var ResumeView = React.createClass({
   getInitialState: function() {
      return {experience: true};
   },

   componentDidMount: function() {
   },

   selectExperience: function() {
      this.setState({experience: true});
   },

   selectProject: function() {
      this.setState({experience: false});
   },

   render: function() {
      return (
         <div className="col-xs-12 resume-item right top-gutter-sm">
            <div className="progress vertical min-page-height bottom-right">
               <div className="progress-bar fade-in blue" style={width_height_100}>
               </div>
            </div>
            <div className={'item col-xs-6' + (this.state.experience ? '' : ' not-active')} onClick={this.selectExperience}>
               <h4>Experience</h4>
            </div>
            <div className="no-gutter-right col-xs-6">
               <div className={'item' + (this.state.experience ? ' not-active' : '')} onClick={this.selectProject}>
                  <h4>Projects</h4>
               </div>
            </div>
            {
               this.state.experience ? 
               <ResumeExperience data={_Resume.experience} /> :
               <ResumeProjects data={_Resume.projects} />
            }
         </div>
      );
   }
});

var LanguageList = React.createClass({
   render: function() {
      var languageNodes = this.props.data.map(function(language) {
         return (
            <div className="col-sm-4" key={language.name}>
               <div className={'item col-xs-12 short level-' + language.proficiency }>
                  <img alt={language.pretty_name} src={'/images/resume/' + language.name + '.png' } />
               </div>
            </div>
         );
      });

      return (
         <div className="languages">
            {languageNodes}
         </div>
      );
   }
})

var Languages = React.createClass({
   render: function() {
      return (
         <div className="col-xs-12 resume-item right">
            <div className="item col-xs-12">
               <h4 className="col-sm-4 col-xs-12">Languages</h4>
               <div className="col-sm-8 col-xs-12 pull-right topgutter">
                  <span className="lift">Proficient</span>
                  <div className="progress no-gutter nogutter">
                     <div className="progress-bar purple-to-green" style={width_height_100}>
                     </div>
                  </div>
                  <span className="col-xs-6 pull-right text-right">Master</span>
               </div>
            </div>
            <LanguageList data={_Resume.languages} />
         </div>
      );
   }
});

var Resume = React.createClass({
	render: function() {
		return (
         <div>
            <NavBar />
            
            <LandingPage page="resume" title="Resume" />
            
            <div className="container"> 
               <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 no-float">
                  <div className="row marketing">
                     <div className="progress nogutter">
                        <div className="progress-bar" style={width_height_100}>
                        </div>
                     </div>
                     <div className="progress vertical min-page-height">
                        <div className="progress-bar fade-out blue" style={width_height_100}>
                       </div>
                     </div>

                     <ResumeView />

                     <div className="progress no-gutter col-xs-12 pull-right">
                       <div className="progress-bar green-to-blue" style={width_height_100}>
                       </div>
                     </div>
                     <div className="progress vertical min-page-height">
                       <div className="progress-bar fade-out green" style={width_height_100}>
                       </div>
                     </div>

                     <Languages />
                  </div>
               </div>
            </div>
         </div>
		);
	}
});

module.exports = Resume;
