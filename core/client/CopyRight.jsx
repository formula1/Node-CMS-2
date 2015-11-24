var React = require('react');

var CopyRight = React.createClass({
  render: function(){
    return <h3>{this.props.title} &#169;</h3>;
  }
});

module.exports = CopyRight;