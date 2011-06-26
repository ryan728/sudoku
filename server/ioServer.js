var io = require('socket.io')

var socket
var clients = []
function startIOServer(httpServer) {
    socket = io.listen(httpServer)
    socket.on('connection', function(client) {
        console.log("client connected: " + client.sessionId)
        client.on('message', function(message) {
            console.log("---------" + message)
            handleMessage(message)
        })

        client.on("disconnect", function() {
            console.log("--------")
        })
    })
}

function handleMessage(message) {
    var reply = JSON.parse(message);
    switch (reply.type) {
        case "connected":
            clients.push({name:reply.name, ready:false})
            break
        case "disconnect":
            break
        default:
    }
    socket.broadcast(message)
}

exports.startIOServer = startIOServer