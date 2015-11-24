var React = require('react');

var PrivacyPolicy = React.createClass({
  render: function(){
    return (<div>
      <h1>This is the Privacy Policy</h1>
    </div>);
  }
});

PrivacyPolicy.title = "Privacy Policy";
PrivacyPolicy.url = "privacy-policy";

module.exports = PrivacyPolicy;