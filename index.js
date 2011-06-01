var server = require("./server")
var router = require("./router")
var requestHandlers = require("./requestHandlers")

var handle = {}
handle["/"] = requestHandlers.start
handle["/start"] = requestHandlers.start
handle["/upload"] = requestHandlers.upload
handle["/sudoku.css"] = requestHandlers.ext_file
handle["/jquery-1.6.1.js"] = requestHandlers.ext_file
server.start(router.route, handle)