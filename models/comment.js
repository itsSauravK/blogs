var mongoose=require("mongoose");

var commentSchema= new mongoose.Schema({
	user:String,
	content:String
});

module.exports=mongoose.model("Comment", commentSchema);