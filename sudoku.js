$(function() {
    $("#number_table>tbody>tr>td").each(function(index, element) {
        $(element).bind("mousedown", function() {
            $(element).addClass("mousedown_td")
        })
        $(element).bind("mouseup", function() {
            $(element).removeClass("mousedown_td")
        })
    })

    var length_unit = 50
    var length_max = length_unit * 9

    var canvas = new Canvas(document.getElementById("puzzle_canvas"))
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
        canvas.append(new Line(start_point, 0, start_point, length_max, {
                    stroke: '#008F28',
                    strokeWidth: strokeWidth
                }))
        canvas.append(new Line(0, start_point, length_max, start_point, {
                    stroke: '#008F28',
                    strokeWidth: strokeWidth
                }))
    }



//    var rect = new Rectangle(100, 100)  // create a CAKE [Rectangle] object
//    rect.x = 250                        // move the Rectangle to (250, 250)
//    rect.y = 250
//    rect.fill = 'green'                 // fill the Rectangle with green color
//    // rotate the Rectangle on every frame
//    rect.addFrameListener(function(t) {
//      this.rotation = ((t / 3000) % 1) * Math.PI * 2
//    })
//    rect.addEventListener("click", function(ev){
//            alert("click " + ev)
////            this.rotation = ((t / 3000) % 1) * Math.PI * 2
//        }, true)
//    canvas.append(rect)



    var cells = []
    for (var i = 0; i < puzzle.length; i++) {
        if (puzzle.charAt(i) == '0') continue

        var x_index = i % 9
        var y_index = Math.floor(i / 9)
//        text_nodes[x_index] = text_nodes[x_index] || []
        cells[x_index] = cells[x_index] || []
        cells[x_index][y_index] = new Cell(canvas)
        var text_node = new TextNode(puzzle.charAt(i), {
                    cx: 15 + x_index * length_unit,
                    cy: y_index * length_unit - 15,
                    width:40,
                    height:40,
                    font: "bold 30px lucida handwriting"
                })

        text_node.addEventListener("click", function(ev){
            alert("click " + ev)
//            this.rotation = ((t / 3000) % 1) * Math.PI * 2
        }, true)
//        text_nodes[x_index][y_index] = text_node
        canvas.append(text_node)
    }

//    $("#puzzle_canvas").click(function(e){
//        var x = Math.floor((e.pageX-$("#puzzle_canvas").offset().left) / length_unit);
//        var y = Math.floor((e.pageY-$("#puzzle_canvas").offset().top) / length_unit);
//        alert(x + "   " + y)
////        rotate(true, 180, text_nodes[x][y])
//    })
})
