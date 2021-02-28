const io = require('socket.io')(3000, {
  cors: {
    origin: "*"
  }
});

var rooms = []

const socketIOHandler = require('./socketIOHandler')(io)