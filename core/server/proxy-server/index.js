'use strict';
require('../globals');

var bouncy = require('bouncy');
var Handler = require('./handler');
var fs = require('fs');
var split = require('split');
var path = require('path');

var port = 9000;

var __sites = global.__sites = path.resolve(__dirname, '../../../sites');

var handleDev, handle404, compileChildren, runCommand;

module.exports = function(configPath, inStream){
  var config = require(configPath);
  var children = {};
  var server = bouncy(function (req, res, bounce) {
    if(req.headers.host === "dev.localhost"){
      return handleDev.call(this,req,res,bounce);
    }

    var host = req.headers.host.split(':')[0].split('.').slice(-2).join('.');
    if(!(host in children)) return handle404(req,res,bounce);
    if(!children[host].fork) return handle404(req,res,bounce);
    bounce(children[host].port);
  });
  server.children = children;
  compileChildren(children, function(err){
    if(err) throw err;
    for(var i in config.children){
      if(config.children[i].on) children[i].on();
    }
    server.listen(config.port,function(){
      console.log('proxy-server listening on ',Object.keys(children),':',config.port);
    });
  });
  server.config = config;
  server.configPath = configPath;
  if(inStream){
    process.stdin.pipe(split()).on('data',function(data){
      runCommand.apply(server, data.split(' ')).then(function(ret){
        console.log(ret);
      }).catch(function(err){
        if(err === 404) return console.log('not found');
        console.log(err);
      });
    });
  }

  return server;

};


compileChildren = function(children, next){
  fs.readdir(__sites,function(err,files){
    if(err) return next(err);
    var oldChildren = Object.keys(children);
    files.forEach(function(poss_child){
      var i = oldChildren.indexOf(poss_child);
      if(i !== -1) return oldChildren.splice(i,1);
      children[poss_child] = new Handler(poss_child,port++);
      console.log('child['+poss_child+'] has been added');
    });
    while(oldChildren.length){
      var name = oldChildren.pop();
      if(children[name].fork) return next(new Error(name+' cannot be removed until stopped'));
      delete children[name];
      console.log('child['+name+'] has been removed');
    }
    return next();
  });
};

handleDev = function(req,res,bounce){
  console.log(req);
  runCommand(req.query.host, req.path.substring(1)).then(function(ret){
    res.statusCode = 200;
    res.end(ret);
  }).catch(function(err){
    if(err === 404) return handle404(req,res,bounce);
    res.statusCode = 500;
    res.end(err.message);
  });
};

runCommand = function(command, host){
  var config = this.config;
  var configPath = this.configPath;
  var children = this.children;
  if(!host) return Promise.reject(404);
  if(!(host in children)) return Promise.reject(404);
  var promise;
  switch(command){
    case 'off': promise = children[host].off(); break;
    case 'on': promise = children[host].on(); break;
    case 'status': promise = children[host].status(); break;
    case 'list':
      return Promise.resolve(JSON.stringify(Object.keys(children)));
    default: return Promise.reject(404);
  }
  return promise.then(function(ret){
    config.children = JSON.parse(JSON.stringify(children));
    fs.writeFileSync(configPath, JSON.stringify(config));
    return JSON.stringify(ret);
  });
};

handle404 = function(req, res){
  res.statusCode = 404;
  res.end('no such host');
};