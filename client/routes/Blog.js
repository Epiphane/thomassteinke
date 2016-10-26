var React = require('react');
var Auth = require('../scripts/Auth');

var NavBar = require('../components/NavBar');

var BlogPost = React.createClass({
   dateFor: function(date) {
      var monthNames = [
         "January", "February", "March",
         "April", "May", "June", "July",
         "August", "September", "October",
         "November", "December"
      ];

      var date = new Date(date);

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
   },

   render: function() {
      var post = this.props.post;

      return (
         <div className="blog-post">
            <small className="blog-timestamp">{this.dateFor(post.createdAt)}</small>
            <h2 className="blog-title">{post.title}</h2>
            <small className="blog-subtext">{post.tags}</small>
            <hr className="light" />
            <div className="blog-body" dangerouslySetInnerHTML={{__html: post.html}}></div>
            <hr />
         </div>
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
      document.body.style.background = 'url(/images/blog_tile.png)';

      var self = this;
      Auth.fetch('/api/blog/page/1')
         .then(function(res) {
            self.setState({ posts: res.json });
         });
   },

   componentWillUnmount: function() {
      document.body.style.background = '#eeeeee';
   },

   render: function() {
      return (
         <div>
            <NavBar />

            <div className="container blog">
               <h1 className="text-center large">Blog</h1>
               <hr />

               {
                  this.state.posts.map(function(post, index) {
                     return (
                        <BlogPost post={post} key={index} />
                     );
                  })
               }
            </div>
         </div>
      );
   }
});

module.exports = Blog;
