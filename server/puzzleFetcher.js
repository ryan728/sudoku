var request = require("request")

function fetchPuzzle(level, callback){
    console.log("Request handler 'fetch puzzle' with level " +   + " was called.")

    request({uri:'http://view.websudoku.com/?level=' + level}, function(error, innerResponse, body) {
        if (innerResponse.statusCode == 200) {
            var cheat = parse_cheat(body)
            var puzzle = parse_table(body)
//                console.log("cheat : " + cheat)
//                console.log("puzzle : " + puzzle)
            callback(cheat, puzzle)
        }
    })
}

function parse_cheat(response_body) {
    var cheat_regex = /var cheat='(\d+)'/
    return cheat_regex.exec(response_body)[1]
}

function parse_table(response_body) {
    var table_regex = /<table.*class=t>(.*)<\/table>/im
    var inner_table = response_body.match(table_regex)[1]

    var trs = inner_table.split("<TR>")
    var value_regex = /value="(\d+)"/i
    var result = ""

    for (var i = 1; i < trs.length; i ++) {
        var tr = trs[i].substring(0, trs[i].length - 5)
        var tds = tr.split("</TD>")
        for (var j = 0; j < tds.length - 1; j ++) {
            var value = tds[j].match(value_regex)
            if (value) {
                result += value[1]
            } else {
                result += "0"
            }
        }
    }
    return result
}

exports.fetchPuzzle = fetchPuzzle