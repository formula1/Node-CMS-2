var Header = require('./header');
var Footer = require('./footer');
var React = require('react');
var Page = React.createClass({
  render: function(){
    return <html>
      <head>
        <title>{this.props.config.title}</title>
      </head>
      <body>
        <Header
          config={this.props.config}
          pages={this.props.pages}
          nav={this.props.config.navs.header}
        />
      {this.props.children}
        <Footer
          config={this.props.config}
          pages={this.props.pages}
          nav={this.props.config.navs.footer}
        />
        <script type="text/javascript" dangerouslySetInnerHTML={{
            __html: 'var APP_PROPS = ' + safeStringify(this.props) + ';'
        }} />
        <script type="text/javascript" src='//fb.me/react-0.14.0-rc1.min.js' />
        <script type="text/javascript" src='//fb.me/react-dom-0.14.0-rc1.min.js' />
        <script type="text/javascript" src='/page.jsx' />
      </body>
    </html>
  }
});

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = Page;