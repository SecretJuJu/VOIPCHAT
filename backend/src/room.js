const roomConfig = require("../config/config.json").roomConfig



export class RoomController {
    static rooms = new Map();
    
    // Room is inner class of RoomController
    static Room = class { 
        roomName = ""
        host = ""
        maxPop = 0
        roomNameRegex = new RegExp("^[0-9a-zA-Z]{"+roomConfig.minRoomLength+","+roomConfig.maxRoomLength+"}$");
        users = new Map();
        constructor(host){
            this.host = host
        }
        setRoomName ( roomName ) {
            flag = false
            if(this.roomNameRegex.test(roomName)) {
                flag = true
                this.roomName = roomName
            }
            return flag
        }
        setMaxPop ( maxPop ) {
            flag = false
            if ( roomConfig.maxPop < maxPop || maxPop >= 1){
                flag = true
                this.maxPop = maxPop
            } 
            return flag 
        }
        
    }

    constructor() {
        
    }
    
    getRooms() {
        return rooms.keys()
    }
    addRoom(room) {
        if (room instanceof Room) { // 미완성
            
            rooms.set(room)
            return true
        } else {
            return false
        }
    }
    deleteRoom(room) {

    }
}