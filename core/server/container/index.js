require('../globals');

require('babel/register')({
    compact: false
});

var path = require('path');
var fs = require('fs');
global.__site = process.cwd();

var config = require(__site+'/config.json');
var Server = require('http').Server;

var our_server = new Server();
var app = require('./http-server')(config.server);

var themeRouter = require('./theme-router');
app.use(themeRouter(config.theme));

our_server.on('request',app);

our_server.listen(process.env.PORT || 8080, function(){
  console.log('app listening on '+(process.env.secure?'https':'http')+'://'+process.env.HOSTNAME+':'+process.env.PORT);
  if(process.send) process.send('ok');
});

