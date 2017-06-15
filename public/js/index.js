var socket = io();
			
socket.on('connect', function(){
	console.log('connected to server');
});

socket.on('disconnect', function(){
	console.log('connection lost');
});

socket.on('newMessage', function(message){
	console.log('newMessage: ', message);
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = $('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current Location</a>')
	
	var formattedTime = moment(message.createdAt).format('h:mm a');
	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href', message.url);
	li.append(a);
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

$('#sendLocation').click(function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported');
	}

	$('#sendLocation').attr('disabled','disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(function(position){
		console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}, function(){
			$('#sendLocation').removeAttr('disabled').text('Send location');
		})
	}, function(){
		$('#sendLocation').removeAttr('disabled').text('Send location');
		alert('Unable to fetch your location');
	})
});