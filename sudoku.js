var length_unit = 50

var Sudoku = function(canavs_element, puzzle) {
    this.canvas = new Canvas(canavs_element)
    this.cells = []

    this.init = function() {
        var length_max = length_unit * 9
        for (var i = 0; i < 10; i ++) {
            var strokeWidth = 0.6
            var start_point = strokeWidth
            if (i > 0) {
                start_point = i * length_unit
            }
            if (start_point == length_max) {
                start_point -= strokeWidth
            }
            if (i % 3 == 0) {
                strokeWidth *= 2
            }
            this.canvas.append(new Line(start_point, 0, start_point, length_max, {
                        stroke: '#008F28',
                        strokeWidth: strokeWidth
                    }))
            this.canvas.append(new Line(0, start_point, length_max, start_point, {
                        stroke: '#008F28',
                        strokeWidth: strokeWidth
                    }))
        }

        for (var i = 0; i < puzzle.length; i++) {
            var x_index = i % 9
            var y_index = Math.floor(i / 9)
            this.cells[x_index] = this.cells[x_index] || []
            this.cells[x_index][y_index] = new Cell(this.canvas, x_index, y_index, puzzle.charAt(i))
        }
    }

    this.init()
}

Sudoku.prototype.selected = function(x, y){
    this.cells[x][y].selected()
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){

        }
    }
}

$(function() {

    $("#number_table>tbody>tr>td").each(function(index, element) {
        $(element).bind("mousedown", function() {
            $(element).addClass("mousedown_td")
        })
        $(element).bind("mouseup", function() {
            $(element).removeClass("mousedown_td")
        })
    })

    var sudoku = new Sudoku(document.getElementById("puzzle_canvas"), puzzle)

    $("#puzzle_canvas").click(function(e) {
            var x = Math.floor((e.pageX - $("#puzzle_canvas").offset().left) / length_unit);
            var y = Math.floor((e.pageY - $("#puzzle_canvas").offset().top) / length_unit);
            sudoku.selected(x, y)
    })

//    var length_max = length_unit * 9
//
//    var canvas = new Canvas(document.getElementById("puzzle_canvas"))
//    for (var i = 0; i < 10; i ++) {
//        var strokeWidth = 0.6
//        var start_point = strokeWidth
//        if (i > 0) {
//            start_point = i * length_unit
//        }
//        if (start_point == length_max) {
//            start_point -= strokeWidth
//        }
//        if (i % 3 == 0) {
//            strokeWidth *= 2
//        }
//        canvas.append(new Line(start_point, 0, start_point, length_max, {
//                    stroke: '#008F28',
//                    strokeWidth: strokeWidth
//                }))
//        canvas.append(new Line(0, start_point, length_max, start_point, {
//                    stroke: '#008F28',
//                    strokeWidth: strokeWidth
//                }))
//    }
//
//    var cells = []
//    for (var i = 0; i < puzzle.length; i++) {
//        var x_index = i % 9
//        var y_index = Math.floor(i / 9)
//        cells[x_index] = cells[x_index] || []
//        cells[x_index][y_index] = new Cell(canvas, x_index, y_index, puzzle.charAt(i))
////        alert(x_index + " " + y_index)
////        alert(cells[x_index][y_index].value())
//    }
//
//    $("#puzzle_canvas").click(function(e) {
//        var x = Math.floor((e.pageX - $("#puzzle_canvas").offset().left) / length_unit);
//        var y = Math.floor((e.pageY - $("#puzzle_canvas").offset().top) / length_unit);
//        cells[x][y].selected(cells)
////        rotate(true, 180, text_nodes[x][y])
//    })
})
