var React = require('react');

var Blog = React.createClass({
  render: function(){
    return (<div>
      <h1>This is the Blog</h1>
    </div>);
  }
});

Blog.title = "Blog";
Blog.url = "blog";


module.exports = Blog;