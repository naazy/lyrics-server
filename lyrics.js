var https = require('https');
var querystring = require('querystring');
var env = require('env2')('./config.env');
var http = require('http');

var api = "http://api.musixmatch.com/ws/1.1/";

function lyricsHandler(handlerReq,handlerRes){
  var body ='';
  var lyrics = '';

  handlerRes.writeHead(200, {'Content-Type' : 'text/html'});

  var reqString = api + 'matcher.lyrics.get?'+
      querystring.stringify({q_track:"Gimme gimme gimme", q_artist:"Abba", apikey:process.env.apiKey});

  console.log(reqString);

  http.get(reqString, function(res){

    res.on('data', function(chunk) {
      body+=chunk;
    });

    res.on('end', function(){
     var data = JSON.parse(body)
     lyrics = data.message.body.lyrics.lyrics_body;
     console.log("im' lyrics", lyrics);
     handlerRes.end("<b>"+lyrics+"</b>");
    });
  });
};



module.exports = {
  lyricsHandler: lyricsHandler
};
