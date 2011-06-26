var http = require("http")
var url = require("url")
var ioServer = require("../server/ioServer")

function start(route, handle) {
    function onRequest(request, response) {
        var postData = ""
        var pathname = url.parse(request.url).pathname
        console.log("Request for " + pathname + " received.")

        request.setEncoding("utf8")
        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk
            console.log("Recieved POST data chunk '" + postDataChunk + "'.")
        })
        request.addListener("end", function() {
            route(handle, pathname, response, postData)
        })
    }

    var server = http.createServer(onRequest)
    server.listen(8888)
    console.log("Server has started.")

    ioServer.startIOServer(server)
}

exports.start = start
