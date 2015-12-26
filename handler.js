var handler = module.exports = {};
var fs = require('fs');

var index = fs.readFileSync(__dirname + '/public/index.html');
var mainJs = fs.readFileSync(__dirname + '/public/main.js');
var styleCss = fs.readFileSync(__dirname + '/public/style.css');

var headersHtml = {
  'Content-Type' : 'text/html'
};
var headersJs = {
  'Content-Type' : 'text/js'
};
var headersCss = {
  'Content-Type' : 'text/css'
};

handler.home = function(req,res){
  res.writeHead(200,headersHtml);
  res.end(index);
};

handler.index = function(req,res){
  res.writeHead(200,headersHtml);
  res.end(index);
};

handler.mainJs = function(req,res){
  res.writeHead(200,headersJs);
  res.end(mainJs);
};

handler.styleCss = function(req,res){
  res.writeHead(200,headersCss);
  res.end(styleCss);
};

handler.notFound = function(req,res){
  res.writeHead(404,headersHtml);
  res.end("resource not found");
};
