
  var socket = io();
  socket.on('connect', function (){
    console.log('connected to the Server');

})
  socket.on('disconnect',function (){
    console.log('Disconnected from server');
  });


socket.on('newMessage',function(message){
  console.log('new Message',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);

});

socket.on('newLocationMessage', function(message){

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">my current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('')

  });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not support by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('location soon send..');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('weh u deh?');
    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });

  }, function(){
    locationButton.removeattr('disabled').text('weh u deh?');
    alert('unable to fetch location');
  });
});
