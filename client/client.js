Client = function(name) {
    this.name = name
    this.faye = new Faye.Client("http://localhost:8888/faye", {
        timeout: 10
    })
}

Client.prototype.getPlayersHandler = function() {
    var that = this
    return function(message) {
//        alert(message)
        var reply = JSON.parse(message)
        $("#player_list").empty()
        for (var i = 0; i < reply.players.length; i++) {
            var player = reply.players[i]
            if (player.name != that.name) {
                addPlayer(player.name, player.ready)
            }
        }
    }
}

Client.prototype.getJoinRequestHandler = function(){
    var that = this
    return function(message){
        var result = confirm(message.player + " request to play game with you, agreed?")
        that.publish("/join/reply", {"result":result, "player":message.player})
    }
}

Client.prototype.connect = function() {
    this.faye.subscribe("/players",this.getPlayersHandler())
    this.faye.subscribe("/game/" + this.name, function(message) {
//        alert("cheat : " + message.cheat)
//        alert("puzzle : " + message.puzzle)
        GAME.start(message.cheat, message.puzzle)
    })
    this.faye.subscribe("/join/request/" + this.name, this.getJoinRequestHandler())
    this.faye.subscribe("/join/reply/" + this.name, function(message){
        if (message.result) {
            alert("request accepted by " + message.player + ".")
        } else {
            alert("request denied by " + message.player + ".")
        }

    })

    this.publish("/login")

    $("#name_p").text("Name: " + this.name)
    $("#connection_section").hide()
    $("#chat_room_section").show()
}

Client.prototype.disconnect = function() {
    $("#connection_section").show()
    $("#chat_room_section").hide()
}

Client.prototype.send = function(message) {
    $("#chat_room").val($("#chat_room").val() + "\n" + this.userName + ": " + "message" + $("#messageInput").val())
}

var addPlayer = function(name, isReady) {
    $('#player_list').
        append($("<option></option>").
        attr("value", name).
        text(name + "(" + isReady + ")"));
}

Client.prototype.play = function(level) {
    this.publish("/game/request", {'level':level})
}

Client.prototype.publish = function(channel, parameters) {
    var message = {'name': this.name}
    if (parameters) {
        for (var member in parameters) {
            message[member] = parameters[member]
        }
    }
    this.faye.publish(channel, message)
}

Client.prototype.join = function(playerName) {
    if(!playerName){
        alert("Please select a player first.")
        return;
    }
    this.publish("/join/request", {'player':playerName[0]})
}