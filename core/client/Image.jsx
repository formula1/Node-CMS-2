var React = require('react');
var QS = require('querystring');
var URL = require('url');

var COMMON_SIZES = {
  logo:{x:50,y:50},
  full:{x:Number.POSITIVE_INFINITY,y:Number.POSITIVE_INFINITY}
}

var Image = React.createClass({
  render: function(){

    var size = Object.create(COMMON_SIZES.full);
    if(this.props.size)
      size = Object.create(COMMON_SIZES[this.props.size]);
    if(this.props.width){
      size.x = this.props.width;
    }
    if(this.props.height){
      size.y = this.props.height;
    }
    var url = "/img"+this.props.src;
    var qs = QS.stringify(size);
    return <img src={url+"?"+qs} width={size.x} height={size.y} />;
  }
});

module.exports = Image;