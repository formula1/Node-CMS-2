var React = require('react');

var HomePage = React.createClass({
  render: function(){
    return (<div>
      <h1>This is the HomePage</h1>
    </div>);
  }
});

HomePage.title = "Home";
HomePage.url = "";

module.exports = HomePage;