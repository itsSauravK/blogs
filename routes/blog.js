const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const {getAllBlogs, 
       getBlog,
       editBlog,
       createBlog,
       updateBlog,
       deleteBlog} = require('../controllers/blogController')

router.get("/blogs",getAllBlogs);

router.get("/blogs/new",(req,res) => {
	res.render("new");
});

router.get("/blogs/:id",getBlog);
	
router.get("/blogs/:id/edit",editBlog);
        
    //NEW BLOG
router.post("/blogs",createBlog);

//UPDATE BLOG
router.put("/blogs/:id",updateBlog);

//DELETE BLOG
router.delete("/blogs/:id",deleteBlog);

		
module.exports = router;