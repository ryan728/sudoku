var handler = require("../requestHandlers")
var assert = require('assert')

var response = "var m_d='<B>Here is the puzzle. Good luck!</B>';\nvar s_c=false;\nvar cheat='479218563512367894638954712295671438346825971781493256164589327923746185857132649';\nvar prefix='800cx';\nvar pid='3524789683';"
// var response = "var cheat='479218563512367894638954712295671438346825971781493256164589327923746185857132649';"
var cheat = handler.parse_cheat(response)
console.log("cheat : " + cheat)
assert.equal(cheat, "479218563512367894638954712295671438346825971781493256164589327923746185857132649", "cheat: " + cheat + " doesn't fit")


var table_string = "<TABLE CELLSPACING=0 CELLPADDING=0 CLASS=t><TR><TD CLASS=g0 ID=c00><INPUT CLASS=d0 SIZE=2 AUTOCOMPLETE=off NAME=81xqv11 MAXLENGTH=1 onBlur=\"j8(this)\" ID=f00></TD><TD CLASS=f0 ID=c10><INPUT CLASS=s0 SIZE=2 AUTOCOMPLETE=off NAME=s81xqv21 READONLY VALUE=\"4\" ID=f10></TD><TD CLASS=f0 ID=c20><INPUT CLASS=d0 SIZE=2 AUTOCOMPLETE=off NAME=81xqv31 MAXLENGTH=1 onBlur=\"j8(this)\" ID=f20></TD><TD CLASS=g0 ID=c30><INPUT CLASS=s0 SIZE=2 AUTOCOMPLETE=off NAME=s81xqv41 READONLY VALUE=\"1\" ID=f30></TD><TD CLASS=f0 ID=c40><INPUT CLASS=s0 SIZE=2 AUTOCOMPLETE=off NAME=s81xqv51 READONLY VALUE=\"7\" ID=f40></TD><TD CLASS=f0 ID=c50><INPUT CLASS=d0 SIZE=2 AUTOCOMPLETE=off NAME=81xqv61 MAXLENGTH=1 onBlur=\"j8(this)\" ID=f50></TD></TR><TR><TD>TEST</TD></TR></TABLE>"
// var table_string = "<TABLE CELLSPACING=0 CELLPADDING=0 CLASS=t><TR></TR></TABLE>"

var result = handler.parse_table(table_string)
assert.equal(result, "0040170000")