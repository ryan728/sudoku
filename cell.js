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

    this.createRect = function(){
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
        this.rect.fill = 'green'
        this.createTextNode(text)
    }

    //    this.rect.addFrameListener(function(t) {
//      this.rotation = ((t / 3000) % 1) * Math.PI * 2
//    })

}

Cell.prototype.createTextNode = function(text) {
    this.text_node = new TextNode(text, {
                cx: 15 + this.x * length_unit,
                cy: (this.y + 1) * length_unit - 15,
                font: "bold 30px lucida handwriting"
            })
    this.canvas.append(this.text_node)
}

Cell.prototype.value = function(){
    return this.text
}

Cell.prototype.selected = function(){
    if(!this.red_rec){
        this.red_rec = this.createRect()
        this.red_rec.stroke = "red"
        this.red_rec.strokeWidth = 3
    }
    this.isSelected = !this.isSelected
    if(this.isSelected){
        this.canvas.append(this.red_rec)
    } else {
        this.canvas.remove(this.red_rec)
    }
}