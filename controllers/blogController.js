const Blog = require('../models/blog');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

exports.getAllBlogs = asyncHandler( async(req, res) => {

    const blogs = await Blog.find({});

    if(blogs){
        res.render("index",{
            blogs:blogs
        });
    }else{
        res.render("index",{
            blogs:blogs
        });
    }
    
});

exports.getBlog = asyncHandler( async(req,res) => {

    await Blog.findById(req.params.id).populate("comments").exec(function(err,blog){
    if(!blog){
        res.redirect("/blogs");
    }else{
        res.render("show",{
			blog:blog
				});
    }	
    })
});

exports.editBlog = asyncHandler(async (req,res) => {

  await Blog.findById(req.params.id, (err, foundBlog) => {
    if(err || !foundBlog){
        console.log(err);
        res.redirect(`/blogs/${req.params.id}`);
    }
        
    else
        res.render("edit",{
        blog:foundBlog
    });

  });

});

exports.createBlog = asyncHandler(async(req,res) => {

    req.body.blog.body= req.sanitize(req.body.blog.body);
    await Blog.create(req.body.blog ,(err, newBlog) => {
        if(err)
            res.render("new");
        else
            res.redirect("/blogs");
        });

});

exports.updateBlog = asyncHandler(async(req,res) => {

    req.body.blog.body= req.sanitize(req.body.blog.body);
	await Blog.findByIdAndUpdate(req.params.id,req.body.blog, (err, updatedBlog)=>{
		if(err)
			res.redirect("/blogs");
		else
			res.redirect(`/blogs/${req.params.id}`);
	});
});

exports.deleteBlog = asyncHandler(async(req,res) => {

    await Blog.findByIdAndRemove(req.params.id,(err)=>{
		if(err)
			res.redirect("/blogs");
		else
			res.redirect("/blogs");
	});
})