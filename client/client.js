Client = function(name) {
    this.name = name
    this.socket = new io.Socket()
    this.socket.client = this
}

Client.prototype.connect = function() {
    this.socket.connect("http://localhost:8888")
    alert("Connected")
    this.socket.on("connect", function() {
        $("#name_p").text("Name: " + this.client.name)
        $("#connection_section").hide()
        $("#chat_room_section").show()

        this.client.sendMessage(null, "connected")
        this.on("message", function(message) {
            this.client.handleMessage(message)
        })
    })
    this.socket.on("disconnect", function() {
    })
}

Client.prototype.disconnect = function() {
    this.sendMessage(null, "disconnect")
    this.socket.disconnect()
    $("#connection_section").show()
    $("#chat_room_section").hide()
}

Client.prototype.send = function(message) {
    this.sendMessage($("#messageInput").val())
    $("#chat_room").val($("#chat_room").val() + "\n" + this.userName + ": " + "message" + $("#messageInput").val())
}

Client.prototype.handleMessage = function(message) {
//    alert("message :" + message)

    var reply = JSON.parse(message);

    switch (reply.type) {
        case "joinRequest":
            this.handleJoinRequest(reply)
            break
        case "joinReply":
            this.handleJoinReply(reply)
            break
        default:
            this.updatePlayerList(reply);
    }
}

Client.prototype.updatePlayerList = function(reply) {
    $("#player_list").empty()
    for (var i=0; i<reply.players.length; i++) {
        var player = reply.players[i]
        if(player.name != this.name){
            this.addPlayer(player.name, player.ready)
        }
    }
}

Client.prototype.handleJoinRequest = function(reply){
    if(reply.message == this.name){
        var result = confirm(reply.name + " request to play game with you, agreed?")
        this.sendMessage(result, "joinReply", {"player" : reply.name})
    }
}

Client.prototype.handleJoinReply = function(reply){
//    alert(reply.name + "  "  + reply.player + "   " + reply.message)
     if(reply.message){
        if(reply.player == this.name){
            alert("request accepted.")
        }
        if(reply.player == this.name || reply.name == this.name){
            GAME.start(reply.cheat, reply.puzzle)
        }
     } else{
         if(reply.player == this.name){
            alert("request denied.")
        }
     }
}

Client.prototype.addPlayer = function(name, isReady) {
    $('#player_list').
                    append($("<option></option>").
                    attr("value", name).
                    text(name + "(" + isReady + ")"));
}

Client.prototype.join = function(playerName){
    this.sendMessage(playerName, "joinRequest")
}

Client.prototype.sendMessage = function(message, messageType, others){
    var package = {"name":this.name, "message":message, "type":messageType}
    if(others){
        for(var member in others){
            package[member] = others[member]
        }
    }
    this.socket.send(JSON.stringify(package))
}