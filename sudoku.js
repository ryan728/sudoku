$(function(){
    $("#number_table>tbody>tr>td").each(function(index, element){
        $(element).bind("mousedown", function(){
            $(element).addClass("mousedown_td")
        })
        $(element).bind("mouseup", function(){
            $(element).removeClass("mousedown_td")
        })
    })
})
