var exec = require("child_process").exec
var querystring = require("querystring")
var fs = require("fs")
var path = require("path")
var request = require("request")
var jade = require("jade")

function parse_cheat(response_body){
	var cheat_regex = /var cheat='(\d+)'/
	return cheat_regex.exec(response_body)[1]
}

function parse_table(response_body){
	var table_regex = /<table.*class=t>(.*)<\/table>/im
	var inner_table = response_body.match(table_regex)[1]

	var trs = inner_table.split("<TR>")
	var value_regex = /value="(\d+)"/i
	var result = ""

	for (var i = 1; i < trs.length; i ++){
		var tr = trs[i].substring(0, trs[i].length - 5)
		var tds = tr.split("</TD>")
		for(var j = 0; j < tds.length; j ++){			
				var value = tds[j].match(value_regex)
				if(value){
					result += value[1]
				} else {
					result += "0"
				}
		}
	}
	return result
}

function start (response, postData) {
	console.log("Request handler 'start' was called.")
	
	var filePath = "./index.html"
	// export_file(filePath, 'text/html', response)
	
//	request({uri:'http://view.websudoku.com/?level=4'}, function(error, innerResponse, body){
//			if(innerResponse.statusCode == 200){
//				response.writeHead("200", {"Content-Type": "text/html"})
//				var cheat = parse_cheat(body)
//				var table = parse_table(body)
//				jade.renderFile("./index.jade", {locals: {cheatsheet:cheat, puzzle:table}}, function(err, html){
////					console.log(html)
//					response.write(html)
//					response.end()
//				})
//			}
//		})

    jade.renderFile("./index.jade", {locals: {cheatsheet:'417895632392674581658123974849512367523467819176389425784256193265931748931748256',
                puzzle:'417895632392674581658123974849512367523467819176389420784256193265931748931748256'}}, function(err, html){
//                puzzle:'407005030000004001008100900009010300500000009006080400004006100200900000030700206'}}, function(err, html){
					response.write(html)
					response.end()
				})
}

function ext_file (response, postData, pathname) {
	var filePath = '.' + pathname
	var extname = path.extname(filePath)
	var contentType = 'text/html'
	switch(extname){
		case '.js':
			contentType = 'text/javascript'
			break
		case '.css':
			contentType = 'text/css'
			break
        case 'jpg':
            contentType = 'image/jpg'
            break
        case 'png':
            contentType = 'image/png'
            break
	}
	export_file(filePath, contentType, response)
}

function export_file (filePath, contentType, response) {
	path.exists(filePath, function(exists){
		if(exists){
			fs.readFile(filePath, function(error, content){
				if(error){
					response.writeHead(500)
					response.end()
				} else{
					response.writeHead("200", {"Content-Type": contentType})
					response.end(content, 'utf-8')	
				}
			})
		} else {
			response.writeHead(404)
			response.end()
		}
	})
}

function upload (response, postData) {
	console.log("Request handler 'upload' was called.")
	response.writeHead("200", {"Content-Type": "text/html"})
	response.write("You've sent the text: " + querystring.parse(postData)["text"])
	response.end()
}

exports.start = start
exports.upload = upload
exports.parse_cheat = parse_cheat
exports.parse_table = parse_table
exports.ext_file = ext_file