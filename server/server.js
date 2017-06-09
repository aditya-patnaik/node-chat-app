const path = require('path');
const http = require('http');	//required for socket io module
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

//createServer is called implicitly by express during app.listen
var server = http.createServer(app);
var io = socketIO(server);	//io is the websocket server

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('disconnect', ()=>{
		console.log('User disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});