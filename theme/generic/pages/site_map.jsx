var React = require('react');

var SiteMap = React.createClass({
  render: function(){
    return (<div>
      <h1>This is the Site Map</h1>
    </div>);
  }
});

SiteMap.title = "Site Map";
SiteMap.url = "site-map";

module.exports = SiteMap;