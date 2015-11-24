/*

  Purpose of the admin router
  1) Allow the Admin to choose a theme
  2) Themes allow customization
    - customization require fields
    - Saved in a 'config' database with [site.id, theme.id]
    - Theme can use customization when delivering html or css
  3) Allow Admins to create, delete, show or hide Pages, Delete
    - Pages can be Lists with Propopulated Queries
    - Customized Search Forms
    - Customized input forms which trigger an "Action"
  4) Install, Enable or Disable Actions
    - Actions require fields
    - What an action does is usually custom
  5) Install, Enable or Disable Models
    - Models require fields
    - Models have a Create, Request, Update and Delete associated to them
    - Models can handled in Lists through a Query
  6) Install, Enable or Disable Fields
    - Fields have
      - validator
      - autofill
      - digestor
*/

var Router = require('express').Router;
var mongodb = require('mongodb');
router.get('/theme.html',function(req,res,next){

});
router.get('/theme.html',function(req,res,next){

});

router.get('/',function(req,res,next){

});