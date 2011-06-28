var io = require('socket.io')
var fetcher = require('../server/puzzleFetcher')

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
            if(!inClientsArray(reply.name)){
                clients.push({"name":reply.name, "ready":true})
            }
            socket.broadcast("{\"players\":" + JSON.stringify(clients) + "}")
            break
        case "joinReply":
            handleJoinReply(reply)
            break
        case "disconnect":
            break
        default:
            socket.broadcast(message)
    }
}

function handleJoinReply(reply){
    if(reply.message){
        fetcher.fetchPuzzle(function(cheat, puzzle){
            reply.cheat = cheat
            reply.puzzle = puzzle
            socket.broadcast(JSON.stringify(reply))
        })
    } else{
        socket.broadcast(JSON.stringify(reply))
    }
}

function inClientsArray(name){
    for(var i = 0; i<clients.length; i++){
        if(clients[i].name == name){
            return true
        }
    }
    return false
}

exports.startIOServer = startIOServer