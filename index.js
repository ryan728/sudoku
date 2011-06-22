var server = require("./server/server")
var router = require("./server/router")
var requestHandlers = require("./server/requestHandlers")

var handle = {}
handle["/"] = requestHandlers.start
handle["/start"] = requestHandlers.start
handle["/upload"] = requestHandlers.upload
handle["/css/sudoku.css"] = requestHandlers.ext_file
handle["/lib/jquery-1.6.1.js"] = requestHandlers.ext_file
handle["/lib/socket.io.js"] = requestHandlers.ext_file
handle["/lib/cake.js"] = requestHandlers.ext_file
handle["/client/sudoku.js"] = requestHandlers.ext_file
handle["/client/cell.js"] = requestHandlers.ext_file
handle["/images/colorful_numbers.png"] = requestHandlers.ext_file
//handle["\/lib\/.+"]
server.start(router.route, handle)

setInterval(function(){
    console.log(process.memoryUsage())
}, 10 * 1000)