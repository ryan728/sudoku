var GAME = {
    "length_unit" : 50,
    "client" : null
}

$(function() {
    $("#number_table>tbody>tr>td").each(function(index, element) {
        $(element).bind("mousedown", function() {
            $(element).addClass("mousedown_td")
            sudoku.numberSelected(index + 1)
            $(element).mouseup()
        })
        $(element).bind("mouseup", function() {
            $(element).removeClass("mousedown_td")
        })
    })

    $("#connectBtn").bind("click", function() {
        GAME.client = new Client($("#nickInput").val())
        GAME.client.connect()
    })

    $("#disconnectBtn").bind("click", function() {
        GAME.client.disconnect()
    })

    $("#messageBtn").bind("click", function() {
        GAME.client.send($("#messageInput").val())
    })

    $("#joinBtn").bind('click', function(){
        GAME.client.join($("#player_list").val())
    })

    var sudoku = new Sudoku(document.getElementById("puzzle_canvas"), cheatsheet, puzzle)

    $("#puzzle_canvas").click(function(e) {
        var x = Math.floor((e.pageX - $("#puzzle_canvas").offset().left) / GAME.length_unit);
        var y = Math.floor((e.pageY - $("#puzzle_canvas").offset().top) / GAME.length_unit);
        sudoku.selected(x, y)
    })
})
