var Cell = function(canvas, x, y, text) {
    this.canvas = canvas
    this.space = 0.05
    this.scale = 1 - 2 * this.space
    this.border_radius = 10
    this.text_node = null
    this.x = x
    this.y = y
    this.text = text
    this.rotation_count = 0

    this.createRect = function() {
        var result = new Rectangle(length_unit * this.scale, length_unit * this.scale)
        result.x = this.x * length_unit + length_unit * this.space
        result.y = this.y * length_unit + length_unit * this.space
        result.rx = this.border_radius
        result.ry = this.border_radius
        return result
    }

    this.rect = this.createRect()
    this.canvas.append(this.rect)

    if (text != '0') {
        this.updateValue(text)
        this.bian()
    }
}

Cell.prototype.hasValue = function(){
    return this.text != '0'
}

Cell.prototype.updateValue = function(value){
    this.text = value
    this.rect.fill = 'yellow'
    this.createTextNode(this.text)
}

Cell.prototype.bian = function(){
    this.rotation_count ++
    this.text_node.animateTo("rotation", Math.PI * 2 * this.rotation_count, 3000, "sine")
}

Cell.prototype.createTextNode = function(text) {
    this.text_node = new TextNode(text, {
                x: 25 + this.x * length_unit,
                y: (this.y + 1) * length_unit - 25,
                cx: -13,
                cy: 12,
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