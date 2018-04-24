const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {isRealString} = require('./utils/validation');
const {Users}= require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');



  socket.on('join',(params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('name and room name are required');
    }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room)


      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      socket.emit('newMessage',generateMessage('admin','Welcome to the chat app'));

      socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} deh ya`));

      callback();

  });

  socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));

    }

    callback();

  });
  socket.on('createLocationMessage',(coords)=>{

    var user = users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });


  socket.on('disconnect', ( )=>{
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('World Boss',`${user.name} has left`));
    }
  });
});

server.listen(port,()=>{
  console.log(`started on port ${port}`);
});
