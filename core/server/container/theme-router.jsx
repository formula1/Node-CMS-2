
var fs = require('fs');
var path = require('path');
var Router = require('express').Router;

module.exports = function(themename){
  var app = new Router();
  var __themename = __themes+"/"+themename;
  var render = require(__themename+'/render');
  var Page = require(__themename+'/client/page');
  var sites = {};
  fs.readdirSync(__themename+'/pages').forEach(function(filename){
    var site = require(__themename+'/pages/'+filename);
    site.path = path.resolve(__themename+'/pages', filename);
    site.pathName = path.parse(filename).name;
    sites[site.pathName] = site;
    app.get('/'+site.url,function(req,res,next){
      render(site,sites).then(function(html){
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      }).catch(next);
    });
  });

  var browserify = require('browserify');
  var renameify = require('renameify');
  var literalify = require('literalify');
  var babelify = require('babelify');

  app.get('/page.jsx',function(req,res,next){
    res.setHeader('Content-Type', 'text/javascript');
    browserify({extensions:[".jsx"]})
      .add(__themename+'/client/page.jsx')
      .transform(babelify)
      .transform(renameify.configure({
        variables: {
          '__core': "\""+__core+"\"",
          '__root': "\""+__root+"\""
        }
      })).transform(literalify.configure({
        'react': 'window.React'
      }))
      .bundle()
      .pipe(res);
  });
  return app;

};


