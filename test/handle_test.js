var assert = require("assert")

var handle = {}
handle['^\/$'] = "start"
handle['^\/start$'] = "start"
handle['^/upload$'] = "upload"
handle["^/css/.+$"] = "ext_file"
handle["^/lib/.+$"] = "ext_file"
handle["^/client/.+$"] = "ext_file"
handle["^/images/.+$"] = "ext_file"


var getHandleName = function(pathName){
    for(var member in handle) {
        if(pathName.match(new RegExp(member, "i"))) {
            return handle[member]
        }
    }
    return null
}

assert.equal("start", getHandleName("/"))
assert.equal("start", getHandleName("/start"))
assert.equal("start", getHandleName("/START"))
assert.equal("upload", getHandleName("/upload"))
assert.equal("ext_file", getHandleName("/css/sudoku.css"))
assert.equal("ext_file", getHandleName("/lib/jquery-1.6.1.js"))
assert.equal("ext_file", getHandleName("/lib/socket.io.js.js"))
assert.equal("ext_file", getHandleName("/lib/cake.js"))
assert.equal("ext_file", getHandleName("/client/sudoku.js"))
assert.equal("ext_file", getHandleName("/client/cell.js"))
assert.equal("ext_file", getHandleName("/images/colorful_numbers.png"))
