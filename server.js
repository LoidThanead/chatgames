// Import modules.
var http = require('http');
var express = require('express'), app = express();
var server = http.createServer(app).listen(3000);
var jade = require('jade');
var io = require('socket.io').listen(server);

// Configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);

// Configure home page.
app.get('/', function(req, res)
{
  res.render('home.jade');
});

/* TODO: figure out how to use the router.
var router = require('socket.io-events')();
router.on('setPseudo', function (socket, args, next) {
	console.dir(args);
	var pseudo = args[1];
	
	socket.pseudo = pseudo;
});
io.use(router);
//*/

var Game = require('./ChatGame.js');

var game = new Game();

//*
// Configure socket io.
io.sockets.on('connection', function(socket)
{
	socket.on('setPseudo', function(data)
	{
		socket.pseudo = data;
	});
	
	socket.on('message', function(message)
	{
		var data = { 'message' : message, pseudo : socket.pseudo };
		socket.broadcast.emit('message', data);
		console.log("user " + socket.pseudo + " send this : " + message);
	});
	
	socket.on('taketurn', function(data)
	{
		var message = game.takeTurn(socket.pseudo);
		var data = { 'message' : message, pseudo : socket.pseudo };
		//socket.broadcast.emit('message', data);
		socket.emit('message', data);
		console.log("user " + socket.pseudo + " rolled the die");
	});
});
//*/