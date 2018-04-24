
  var socket = io();


  function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();


    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight +lastMessageHeight >= scrollHeight) {
       messages.scrollTop(scrollHeight);
    }
  }




  socket.on('connect', function (){
    var params= jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err){
      if(err){
        alert(err);
        window.location.href = '/';

      }else {
        console.log('no error');
      }
    });


});
  socket.on('disconnect',function (){
    console.log('Disconnected from server');
  });

socket.on('updateUserList', function(users){

  var ol = jQuery('<ol></ol>');

  users.forEach(function (user){
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  scrollToBottom();

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
  scrollToBottom();
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
