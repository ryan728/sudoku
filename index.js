var server = require("./server")
var router = require("./router")
var requestHandlers = require("./requestHandlers")

var handle = {}
handle["/"] = requestHandlers.start
handle["/start"] = requestHandlers.start
handle["/upload"] = requestHandlers.upload
handle["/sudoku.css"] = requestHandlers.ext_file
handle["/jquery-1.6.1.js"] = requestHandlers.ext_file
handle["/sudoku.js"] = requestHandlers.ext_file
handle["/socket.io.js"] = requestHandlers.ext_file
handle["/cake.js"] = requestHandlers.ext_file
handle["/cell.js"] = requestHandlers.ext_file
handle["/images/colorful_numbers.png"] = requestHandlers.ext_file
server.start(router.route, handle)

setInterval(function(){
    console.log(process.memoryUsage())
}, 10 * 1000)