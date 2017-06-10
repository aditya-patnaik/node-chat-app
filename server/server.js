const path = require('path');
const http = require('http');	//required for socket io module
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

//createServer is called implicitly by express during app.listen
var server = http.createServer(app);
var io = socketIO(server);	//io is the websocket server

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

	socket.on('createMessage', (message) => {
		console.log('createMessage: ', message);

		io.emit('newMessage', generateMessage(message.from, message.text));
		/*socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});*/
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});