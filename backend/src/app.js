const io = require('socket.io')(3000, {
  cors: {
    origin: "*"
  }
});

const socketIOHandler = require('./socketIOHandler')(io)