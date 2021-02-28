var rooms = new Set();
const roomIdRegex = /^[0-9a-zA-Z]{4,16}$/;
exports = module.exports = function(io) {
    io.on('connection', (socket)=> {
        console.log("SOCKETIO connection EVENT: ", socket.id, " client connected");
        // 여기서부터 socket에 대한 이벤트를 작성하면 된다.
        socket.on("makeRoom",(roomId) => {
            if(roomIdRegex.test(roomId)){
                rooms.has(roomId)? socket.emit('makeRoom',{"result":true,"overlap":true}) : ()=>{
                    rooms.add(roomId)
                    socket.emit('makeRoom',{"result":true})
                }
            } else {
                socket.emit('makeRoom',{"result":true,"overlap":false})
            }
        })
    })
};