
  var socket = io();
  socket.on('connect', function (){
    console.log('connected to the Server');

})
  socket.on('disconnect',function (){
    console.log('Disconnected from server');
  });


socket.on('newMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);


});

socket.on('newLocationMessage', function(message){

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var locationTemplate = jQuery('#locationMessage-template').html();
  var html = Mustache.render(locationTemplate, {
    text: message.text,
    from: message.from,
    createdAt:formattedTime,
    url:message.url
  });
  jQuery('#messages').append(html);
});

//   var formattedTime = moment(message.createdAt).format('h:mm a');
//
//   var li = jQuery('<li></li>');
//   var a = jQuery('<a target="_blank">my current location</a>');
//
//   li.text(`${message.from} ${formattedTime}: `);
//   a.attr('href', message.url);
//   li.append(a);
//   jQuery('#messages').append(li);
// });

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
