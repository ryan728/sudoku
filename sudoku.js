var length_unit = 50

var Sudoku = function(canavs_element, cheatsheet, puzzle) {
    this.canvas = new Canvas(canavs_element)
    this.cells = []
    this.selected_x = null
    this.selected_y = null
    this.cheatsheet = cheatsheet

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

Sudoku.prototype.inSameComb = function (x1, y1, x2, y2){
    return Math.floor(x1 / 3) == Math.floor(x2 / 3) && Math.floor(y1 / 3) == Math.floor(y2 / 3)
}

Sudoku.prototype.selected = function(x, y){
    this.selected_x = x
    this.selected_y = y
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            this.cells[i][j].clearSelected()
            if(i == x && j == y) {
                this.cells[i][j].selected()
                continue
            }
            if(i == x || j == y || this.inSameComb(x, y, i, j)){
                this.cells[i][j].lineSelected()
            }
            if(this.cells[x][y].value() == this.cells[i][j].value()){
                this.cells[i][j].sameValueSelected()
            }
        }
    }
}

Sudoku.prototype.numberSelected = function(number){
    if(this.selected_x == null || this.selected_y == null) {
        alert("select first")
        return
    }
    var cell = this.cells[this.selected_x][this.selected_y]
    if(cell.hasValue()){
        alert("filled")
        return
    }
    if(this.cheatsheet.charAt(this.selected_y * 9 + this.selected_x) != number.toString()){
        alert("wrong")
        return
    }
    cell.updateValue(number)
    this.selected(this.selected_x, this.selected_y)
    this.checkGame()
}

Sudoku.prototype.checkGame = function(){
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(this.cheatsheet.charAt(j * 9 + i) != this.cells[i][j].value()) return
        }
    }
    alert("Congratulation!")
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

    var sudoku = new Sudoku(document.getElementById("puzzle_canvas"), cheatsheet, puzzle)

    $("#puzzle_canvas").click(function(e) {
            var x = Math.floor((e.pageX - $("#puzzle_canvas").offset().left) / length_unit);
            var y = Math.floor((e.pageY - $("#puzzle_canvas").offset().top) / length_unit);
            sudoku.selected(x, y)
    })
})
