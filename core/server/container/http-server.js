var express = require('express');

module.exports = function(config){
  var app = express();

  app.use(function(req,res,next){
    console.log('req.url',req.url);
    next();
  });

  return app;
};