var express =require("express");
var app = express();
var bodyParser= require("body-parser");
var mongoose =require("mongoose");
var methodOveride= require("method-override");
var expressSantizer= require("express-sanitizer");
//app config

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/blogs', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOveride("_method"));
app.use(expressSantizer()); //after body-parser

//mongoose config
var Comment=require("./models/comment");

var Blog=require("./models/blog");


// Blog.create({
// 	title:"Test2",
// 	image:"https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	body:"blah,blah",
// 	author:"Saurav"
// });
// Comment.create({
// 	user:"saurav",
// 	content:"HI"
// },function(err,comment){
// 	if(err)
// 		console.log(err);
// 	else{
// 		Blog.findOne({title:"Test2"},function(err,blog){
// 			blog.comments.push(comment);
// 			console.log(blog);
// 			blog.save();
// 		});
// 	}
		
// });

//restful routes

//INDEX
app.get('/',function(req,res){
	res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err)
			console.log(err);
		else
			res.render("index",{
				blogs:blogs
			});
	});
	
});
  
//NEW BLOG
app.get("/blogs/new",function (req,res){
	res.render("new");
});

//SHOW BLOG
app.get("/blogs/:id",function(req,res){
	//var id=req.params.id;
	Blog.findById(req.params.id).populate("comments").exec(function(err,blog){
		if(err){
			console.log("working");
			res.redirect("/blogs");
		}
		else{
			console.log(blog);
			res.render("show",{
			blog:blog
				});
			}
					   
	});
	
	});
	
		
	


//EDIT BLOG
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			res.redirect("/blogs/"+req.params.id);
		else
			res.render("edit",{
				blog:foundBlog
			});
	});
	
});

//NEW BLOG
app.post("/blogs",function(req,res){
	req.body.blog.body= req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog ,function(err, newBlog){
		if(err)
			res.render("new");
		else
			res.redirect("/blogs");
	});
});


//UPDATE BLOG
app.put("/blogs/:id",function(req,res){
	req.body.blog.body= req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err, updatedBlog){
		if(err)
			res.redirect("/blogs");
		else
			res.redirect("/blogs/"+req.params.id);
	});
});

//DELETE BLOG
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err)
			res.redirect("/blogs");
		else
			res.redirect("/blogs");
	});
	//res.send("Destroy");
});

app.post("/blogs/:id/comment",function(req,res){
	
		Blog.findById(req.params.id,function(err,blog){
			if(err){
				console.log(err);
				res.redirect("/blogs");
			}
			else{
				Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err);
				else{
					blog.comments.push(comment);
					blog.save();
					res.redirect("/blogs/"+req.params.id);
					}
				});
			}
		
			
	});
});

app.listen(3000,function(){
	console.log("Server connected");
});

