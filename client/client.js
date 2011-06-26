Client = function(name) {
    this.name = name
    this.socket = new io.Socket()
    this.socket.client = this
}

Client.prototype.connect = function() {
    this.socket.connect("http://localhost:8888")
    this.socket.on("connect", function() {
        alert("Connected")
        $("#connection_section").hide()
        $("#chat_room_section").show()

        this.send(JSON.stringify({"type":"connected", "name":this.client.name}))
        this.on("message", function(message) {
//                var reply = JSON.parse(message);
//                $("#chat_room").val($("#chat_room").val() + "\n" + reply.name + ": " + reply.message)
            this.client.handleMessage(message)
        })
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
    var reply = JSON.parse(message);
    alert("message type : " + reply.type)

    switch (reply.type) {
        case "connected":
            $('#player_list').
                    append($("<option></option>").
                    attr("value", reply.name).
                    text(reply.name));
            break
        case "disconnect":
            break
        default:
            $("#chat_room").val($("#chat_room").val() + "\n" + reply.name + ": " + reply.message)
    }
}