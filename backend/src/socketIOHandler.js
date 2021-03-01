var rooms = new Set();




exports = module.exports = function(io) {
    io.of("/").on('connection', (socket)=> {
        console.log("SOCKETIO connection EVENT: ", socket.id, " client connected");
        // 여기서부터 socket에 대한 이벤트를 작성하면 된다.
        // get rooms
        socket.on("getRooms",() => {
            console.log(rooms)
            socket.emit("getRooms",rooms)
        })
        // make room
        socket.on("makeRoom",(roomId) => {
            console.log("make room "+roomId)
            if(roomIdRegex.test(roomId)){
                if( rooms.has(roomId) ){
                    socket.emit('makeRoom',{"result":false,"overlap":true})
                } else {
                    rooms.add(roomId)
                    socket.emit('makeRoom',{"result":true})
                }
            } else {
                socket.emit('makeRoom',{"result":false,"overlap":false})
            }
        })

        
    })
};