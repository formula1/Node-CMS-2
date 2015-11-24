var React = require('react');

var About = React.createClass({
  render: function(){
    return (<div>
      <h1>This is the About</h1>
    </div>);
  }
});

About.title = "About Us";
About.url = "about";

module.exports = About;