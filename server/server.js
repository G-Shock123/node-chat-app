const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('admin','A new user just joined'));


  socket.on('createMessage',(message,callback)=>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback('This is from the server');

  });
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('admin', coords.latitude, coords.longitude))
  });


  socket.on('disconnect', (socket)=>{
    console.log('You have been disconnected from the client');
  });
});

server.listen(port,()=>{
  console.log(`started on port ${port}`);
});
