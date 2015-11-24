var React = require("react");
var Page = require('./client/page');
var config = require(__site+'/config.json');


module.exports = function(site){
  var CurPageElem = require(site.path);
  return new Promise(function(res,rej){
    res(React.renderToString(
      <Page
        currentPage={site}
        pages={sites}
        config={config}
      ><CurPageElem /></Page>
    ));
  });

}