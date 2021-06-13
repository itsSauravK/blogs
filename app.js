const express =require("express");
const app = express();
const connectDB = require("./configerations/mongo");
const methodOveride= require("method-override");
const expressSantizer= require("express-sanitizer");
const {routeNotFound, errorHandler} = require("./middleware/errorMiddleware");

//connecting DB
connectDB();


//app config

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOveride("_method"));
app.use(expressSantizer()); //after body-parser

//mongoose config
const Comment=require("./models/comment");
const Blog=require("./models/blog");

//Routes
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");


//INDEX
app.get('/',function(req,res){
	res.redirect("/blogs");
});

app.use(blogRoutes);
app.use(commentRoutes);


// Error middlewares
app.use(routeNotFound);
app.use(errorHandler);


app.listen(3000,function(){
	console.log("Server connected");
});

