var jade = require("jade")
var assert = require("assert")

var content = jade.renderFile("./index.jade", {locals: {cheatsheet:'cheat', puzzle:'puzzle'}}, function(err, html){
	console.log(err)
    console.log(html)
})
	
