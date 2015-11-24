var React = require('react');
var Nav = require("core/client/Nav");
var ImageElem = require("core/client/Image");

var Header = React.createClass({
  render: function(){
    return (
      <div>
        <div class="branding">
            <ImageElem src={this.props.config.logo} size="logo" />
            <h1>{this.props.config.title}</h1>
        </div>
        <Nav locations={this.props.nav.map(function(name){
            return this.props.pages[name];
        }.bind(this))} ></Nav>
      </div>
    );
  }
});

module.exports = Header;