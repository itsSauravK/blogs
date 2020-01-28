var mongoose=require("mongoose");
// var Comment=require("comment");
var blogSchema= new mongoose.Schema({
	title:String,
	image:{type : String,default :"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSKQglFr_ysoT73Jd_0oVfbfR6myl3StJ9-AcuQ2ERkJstjTklD"},
	body:String,
	created: {type : Date,default :Date.now},
	author: String,
	comments: [{
		type:mongoose.Schema.Types.ObjectId,
		//ref="Comment"
		ref:"Comment"
	}]
});

module.exports=mongoose.model("Blog", blogSchema);