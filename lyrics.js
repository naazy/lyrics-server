var https = require('https');
var querystring = require('querystring');
var env = require('env2')('./config.env');
var http = require('http');
var parser = require('xml2json');

function trackHandler(req,res){
  res.writeHead(200, {'Content-Type' : 'text/html'});
  getSongDetails(req,res,returnLyrics);
};


function getSongDetails(req,res, callback){
  var body = '';
  req.on('data', function (dataChunk) {
      body += dataChunk;
  });
  req.on('end', function () {
    var entries = body.split('&');
    var deets = entries.map(splitByEquals);
    var artist=deets[0][1];
    var track=deets[1][1];
    var language=deets[2][1];
    console.log(artist,track,language);

    callback(artist,track,language,res);
  });
}

function splitByEquals(arg){
  return arg.split("=");
}

function returnLyrics(artist,track,language,handlerRes){
  var body ='';
  var lyrics = '';

  var api = "http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?";

  var ApiReqString = api +
      querystring.stringify({ artist:artist,song:track});
      console.log(ApiReqString);
// apikey:process.env.apiKey

console.log(ApiReqString);

  http.get(ApiReqString, function(res){
    res.on('data', function(chunk) {
        body+=chunk;
      });

    res.on('end', function(){
      var xmlObj=body;
      jsonObj = parser.toJson(xmlObj);
      jsonObjParsed=JSON.parse(jsonObj);
      lyrics=jsonObjParsed['GetLyricResult']['Lyric'];
      handlerRes.end("<p>"+lyrics+"</p>");
        });
    });
};



module.exports = {
  trackHandler: trackHandler
};
