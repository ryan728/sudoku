Client = function(name) {
    this.name = name
    this.socket = new io.Socket()
    this.socket.client = this
}

Client.prototype.connect = function() {
    this.socket.connect("http://localhost:8888")
    alert("Connected")
    this.socket.on("connect", function() {
        $("#connection_section").hide()
        $("#chat_room_section").show()

        this.send(JSON.stringify({"type":"connected", "name":this.client.name}))
        this.on("message", function(message) {
            this.client.handleMessage(message)
        })
    })
    this.socket.on("disconnect", function() {
    })
}

Client.prototype.disconnect = function() {
    this.socket.send(JSON.stringify({"type":"disconnect", "name":this.name}))
    this.socket.disconnect()
    $("#connection_section").show()
    $("#chat_room_section").hide()
}

Client.prototype.send = function(message) {
    this.socket.send(JSON.stringify({"name":this.name, "message":$("#messageInput").val()}))
    $("#chat_room").val($("#chat_room").val() + "\n" + this.userName + ": " + "message" + $("#messageInput").val())
}

Client.prototype.handleMessage = function(message) {
    alert("message :" + message)

    var reply = JSON.parse(message);

    switch (reply.type) {
        case "connected":
            $('#player_list').
                    append($("<option></option>").
                    attr("value", reply.name).
                    text(reply.name));
            break
        default:
            this.updatePlayerList(reply);
    }
}

Client.prototype.updatePlayerList = function(reply) {
    $("#player_list").empty()
    for (var i=0; i<reply.players.length; i++) {
        this.addPlayer(reply.players[i].name,reply.players[i].ready)
    }
}

Client.prototype.addPlayer = function(name, isReady) {
    $('#player_list').
                    append($("<option></option>").
                    attr("value", name).
                    text(name + "(" + isReady + ")"));
}