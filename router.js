var handler = require('./handler.js');
var lyrics = require('./lyrics.js');

var fs = require('fs');

var routes = {
  '/' : handler.home,
  '404' : handler.notFound,
  '/index' : handler.index,
  '/lyrics' : lyrics.lyricsHandler,
  '/track' : lyrics.trackHandler
};

module.exports = function(req,res){
  console.log(req.url);
  if(routes[req.url]){
    routes[req.url](req,res);
  } else {
    routes[404](req,res);
  }
};
