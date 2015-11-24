var React = require('react');

var Nav = React.createClass({
  render: function(){
    return <nav>{this.props.locations.map(function(location){
      console.log(location);
      return <a href={"/"+location.url}>{location.title}</a>
    })}</nav>
  }
});

module.exports = Nav;