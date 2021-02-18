const express = require('express');
const http = require('http');
const { emit } = require('process');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server)
const PORT = 8000

io.on("connection", (socket) => {
    socket.on("join room",roomId=>{ 
        if(rooms[roomId]) { // room 이 이미 있다면 join room
            rooms[roomId].push(socket.id)
        } else {
            rooms[roomId] = socket.id // room 이 없다면 자신의 id 로 룸을 만듬
        }
        const otherUser = rooms[roomId].find(id => id !== socket.id) // 해당 room 에 자신을 제외한 다른 user가 있는지 확인
        if(otherUser) { // 다른 유저가 있다면 
            socket.emit("other user",otherUser) // 어떤 유저가 있는지 보냄
            socket.to(otherUser).emit("user joined",socket.id) // 해당 room에 user가 들어왔다고 broadcast
        }
    })

    socket.on("offer",payload => {
        io.to(payload.target).emit("offer",payload)
    })
    socket.on("answer",payload => {
        io.to(payload.target).emit("answer",payload)
    })
    socket.on("ice-candidate",incoming=> {
        io.to(incoming.target).emit("ice-candidate",incoming.candidate)
    })
})

server.listen(PORT,() => console.log("server is running on port " + PORT))