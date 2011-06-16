var Cell = function(canvas, x, y, text) {
    this.canvas = canvas
    this.space = 0.05
    this.scale = 1 - 2 * this.space
    this.border_radius = 10
    this.text_node = null
    this.x = x
    this.y = y
    this.text = text

    this.isSelected = false

    this.createRect = function() {
        var result = new Rectangle(length_unit * this.scale, length_unit * this.scale)
        result.x = this.x * length_unit + length_unit * this.space
        result.y = this.y * length_unit + length_unit * this.space
        result.rx = this.border_radius
        result.ry = this.border_radius
        return result
    }

    this.rect = this.createRect()

    this.rect.addEventListener("click", function(ev) {
        this.rotation = ((ev / 3000) % 1) * Math.PI * 2
    }, true)
    this.canvas.append(this.rect)

    if (text != '0') {
        this.updateValue(text)
    }

    //    this.rect.addFrameListener(function(t) {
//      this.rotation = ((t / 3000) % 1) * Math.PI * 2
//    })

}

Cell.prototype.hasValue = function(){
    return this.text != '0'
}

Cell.prototype.updateValue = function(value){
    this.text = value
    this.rect.fill = 'yellow'
    this.createTextNode(this.text)
}

Cell.prototype.createTextNode = function(text) {
    this.text_node = new TextNode(text, {
                cx: 15 + this.x * length_unit,
                cy: (this.y + 1) * length_unit - 15,
                font: "bold 30px lucida handwriting"
            })
    this.canvas.append(this.text_node)
}

Cell.prototype.value = function() {
    return this.text
}

Cell.prototype.clearSelected = function() {
    if(this.line_selected_rec){
        this.canvas.remove(this.line_selected_rec)
        this.line_selected_rec = null
    }
    if(this.same_value_selected_rec){
        this.canvas.remove(this.same_value_selected_rec)
        this.same_value_selected_rec = null
    }
}

Cell.prototype.selected = function() {
    this.sameValueSelected()
    this.lineSelected();
}

Cell.prototype.lineSelected = function() {
    this.line_selected_rec = this.createRect()
    this.line_selected_rec.stroke = "red"
    this.line_selected_rec.strokeWidth = 1

    this.canvas.append(this.line_selected_rec)
}

Cell.prototype.sameValueSelected = function() {
    if(this.text === '0') return
    this.same_value_selected_rec = this.createRect()
    this.same_value_selected_rec.stroke = "green"
    this.same_value_selected_rec.strokeWidth = 3
    this.canvas.append(this.same_value_selected_rec)
}