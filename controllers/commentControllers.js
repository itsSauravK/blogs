const Blog = require('../models/blog');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');


exports.postComment = asyncHandler(async(req,res) => {

    const blog = await Blog.findById(req.params.id);

    if(blog){
        const comment = await Comment.create(req.body.comment);
        if(comment){
            blog.comments.push(comment);
            await blog.save();
            res.redirect("/blogs/"+req.params.id);
        }else{
            res.status(404);
            throw new Error('Comment not found');
        }

    }else{
        res.status(404);
        throw new Error("Blog not found");
    }
     
});