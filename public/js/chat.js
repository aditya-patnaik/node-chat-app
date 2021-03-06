var socket = io();

function scrollToBottom(){
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}
			
socket.on('connect', function(){
	console.log('connected to server');
	
	var params = $.deparam(window.location.search);
	socket.emit('join', params, function(err){
		if(err){
			alert(err);
			window.location.href = "/";
		} else{
			console.log('No error');
		}
	})
});

socket.on('disconnect', function(){
	console.log('connection lost');
});

/*socket.on('updateUserList', function(users){
	console.log('Users list', users);
});*/

socket.on('updateUserList', function(data){
	//console.log('Users List', data.userList);
	$('#chat-title').html(data.room);

	$('#user-list').html('');
	data.userList.forEach(function(user){
		$('#user-list').append($('<span></span>').html(user + ', '));
	});
});

socket.on('newMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);

	scrollToBottom();

	/*console.log('newMessage: ', message);
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = $('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	$('#messages').append(li);*/
});

socket.on('newLocationMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);

	scrollToBottom();
	/*var li = $('<li></li>');
	var a = $('<a target="_blank">My current Location</a>')
	
	var formattedTime = moment(message.createdAt).format('h:mm a');
	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li);*/
});

$('#message-form').on('submit', function(evt){
	evt.preventDefault();
	
	socket.emit('createMessage', {
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