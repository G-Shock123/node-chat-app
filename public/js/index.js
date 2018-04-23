
  var socket = io();
  socket.on('connect', function (){
    console.log('connected to the Server');



    socket.emit('createMessage',{
    from: 'Yah bwoi',
    text: 'aint nothing but a chikecn wing'
  });
})
  socket.on('disconnect',function (){
    console.log('Disconnected from server');
  });




socket.on('newMessage',function(message){
  console.log('new Message',message);

});
