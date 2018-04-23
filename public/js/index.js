
  var socket = io();
  socket.on('connect', function (){
    console.log('connected to the Server');




})
  socket.on('disconnect',function (){
    console.log('Disconnected from server');
  });




socket.on('newMessage',function(message){
  console.log('new Message',message);

});
