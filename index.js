var express = require('express')
var alexa = require('alexa-app');
var bodyParser = require('body-parser');

var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.set('view engine','ejs');

var port = process.env.PORT || 3978;
var app = new alexa.app('test');
var name;
var claims = [];

app.launch(function(request, response) {
    response.say('Wellcome, what do you want to do?');
	response.shouldEndSession(false);
});

app.intent("presentIntent",
	{
		"slots":{}
		,"utterances": [
			"start presentation",
			"please start the presentation",
			"can you start the presentation",
			"could you start the presentation"
		]
	},
	function(request,response) {
		response.say("<s>Of course</s><s>Wellcome all to the AXA Engineering Summit!</s><s>In this presentation we will show you Intelligent bots</s>");
		response.shouldEndSession(false);		
	}
);

app.intent("showClaimsIntent",
	{
		"slots":{}
		,"utterances": [
			"Do I have any claim",
			"Tell me my claims",
			"What do you know about my claims"
		]
	},
	function(request,response) {
		if (claims.length === 0) {
			response.say("<s>Currently you have no claims</s>")
		} else if (claims.length === 1) {
			response.say("<s>Currently you have one claim</s>")
		} else {
			response.say("<s>Currently you have "+claims.length+" claims");
		}
		response.shouldEndSession(false);		
	}
);

app.intent("goodbyeIntent",
	{
		"slots":{}
		,"utterances": [
			"goodbye"
		]
	},
	function(request,response) {
		response.say("<s>Goodbye</s>");
		response.shouldEndSession(true);		
	}
);

app.express(server, "/echo/");

server.listen(port);
console.log("Listening on port "+port);