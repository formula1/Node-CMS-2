var React = require('react');

var FourOhFour = React.createClass({
  render: function(){
    return (<div>
      <h1>This is the 404</h1>
    </div>);
  }
});

FourOhFour.title = "404";
FourOhFour.url = "404";

module.exports = FourOhFour;