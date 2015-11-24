var React = require('react');
var CopyRight = require("core/client/CopyRight");
var Nav = require("core/client/Nav");


var Footer = React.createClass({
  render: function(){
    return (
      <div>
        <Nav locations={this.props.nav.map(function(name){
            console.log(name);
            return this.props.pages[name];
        }.bind(this))} ></Nav>
      <CopyRight title={this.props.config.company} />
      </div>
    );
  }
});

module.exports = Footer;