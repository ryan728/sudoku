var server = require("./server/server")
var router = require("./server/router")
var requestHandlers = require("./server/requestHandlers")

var handle = {}
handle['^\/$'] = requestHandlers.start
handle['^\/start$'] = requestHandlers.start
handle['^/upload$'] = requestHandlers.upload
handle["^/css/.+$"] = requestHandlers.ext_file
handle["^/lib/.+$"] = requestHandlers.ext_file
handle["^/client/.+$"] = requestHandlers.ext_file
handle["^/images/.+$"] = requestHandlers.ext_file
handle["^/jade/.+$"] = requestHandlers.ext_file

server.start(router.route, handle)

//setInterval(function(){
//    console.log(process.memoryUsage())
//}, 10 * 1000)