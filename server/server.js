const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('Welcome new user connected');

  socket.on('disconnect', (socket)=>{
    console.log('You have been disconnected from the client');
  });
});

server.listen(port,()=>{
  console.log(`started on port ${port}`);
});
