var socket = io();
			
socket.on('connect', function(){
	console.log('connected to server');

	socket.emit('createMessage', {
		from: 'Aditya',
		text: 'Sample text'
	});
});

socket.on('disconnect', function(){
	console.log('connection lost');
});

socket.on('newMessage', function(message){
	console.log('newMessage: ', message);
});