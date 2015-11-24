var React = require('react');

var Gallery = React.createClass({
  render: function(){
    return (<div>
      <h1>This is the Gallery</h1>
    </div>);
  }
});

Gallery.title = "Gallery";
Gallery.url = "gallery";


module.exports = Gallery;