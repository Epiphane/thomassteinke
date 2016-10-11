var React = require('react');

var LandingPage = React.createClass({
	render: function() {
		return (
			<div id="parallax-header" className="parallax-enable banner">
            <div className={'parallax-image ' + this.props.page.toLowerCase()}>
            </div>

            <div className="container page-title">
               <h1 className="title" style={{color: this.props.color || '#eeeeee'}}>{this.props.title}</h1>
            </div>
         </div>
		);
	}
});

module.exports = LandingPage;
