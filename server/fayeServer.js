var faye = require("../lib/faye")
var fetcher = require('../server/puzzleFetcher')

var bayeux
var client
var clients = []
function start(httpServer) {

    bayeux = new faye.NodeAdapter({
        mount: '/faye',
        timeout: 10
    })
    bayeux.attach(httpServer)
//    bayeux.getClient().addExtension(Logger)

    client = new faye.Client("http://localhost:8888/faye")
    client.addExtension(Logger);
    client.subscribe("/login", handleLogin)
    client.subscribe("/logout", handleLogout)
    client.subscribe("/game/request", handleGameRequest)
    client.subscribe("/join/request", handleJoinRequest)
    client.subscribe("/join/reply", handleJoinReply)
}

var handleLogin = function(reply) {
    if (!inClientsArray(reply.name)) {
        console.log("====== " + reply.name + " login ======")
        clients.push({"name":reply.name, "ready":true})
    }
    client.publish("/players", "{\"players\":" + JSON.stringify(clients) + "}")
}

var handleLogout = function(reply) {

}

var handleGameRequest = function(request) {
    fetcher.fetchPuzzle(request.level, puzzleHandler(request))
}

var handleJoinRequest = function(request) {
    publish("/join/request/" + request.player, {"player":request.name})
}

var handleJoinReply = function(reply) {
    publish("/join/reply/" + reply.player, {"result":reply.result, "player":reply.name})
    if (reply.result) {
        fetcher.fetchPuzzle(4, function(cheat, puzzle) {
            publish("/game/" + reply.name, {"cheat":cheat, "puzzle":puzzle})
            publish("/game/" + reply.player, {"cheat":cheat, "puzzle":puzzle})
        })
    }
}

function handleJoinReply(reply) {
    if (reply.message) {
        fetcher.fetchPuzzle(4, puzzleHandler(reply))
    } else {
        broadcastJSONObject(reply)
    }
}

function handleFetchPuzzle(request) {
    fetcher.fetchPuzzle(request.level, puzzleHandler(request))
}

function puzzleHandler(request) {
    return function(cheat, puzzle) {
        publish("/game/" + request.name, {"cheat":cheat, "puzzle":puzzle})
    }
}

function publish(channle, message) {
    client.publish(channle, message)
}

function inClientsArray(name) {
    for (var i = 0; i < clients.length; i++) {
        if (clients[i].name == name) {
            return true
        }
    }
    return false
}

Logger = {
    incoming: function(message, callback) {
        console.log('----- incoming -----', message);
        callback(message);
    },
    outgoing: function(message, callback) {
        console.log('----- outgoing -----', message);
        callback(message);
    }
};

exports.start = start