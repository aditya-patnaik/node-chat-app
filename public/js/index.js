var socket = io();
			
socket.on('connect', function(){
	console.log('connected to server');
});

socket.on('disconnect', function(){
	console.log('connection lost');
});

socket.on('newMessage', function(message){
	console.log('newMessage: ', message);
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	$('#messages').append(li);
});

$('#message-form').on('submit', function(evt){
	evt.preventDefault();
	
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function(){
		$('[name=message]').val('')
	});
});