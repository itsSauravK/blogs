const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Blog = require("../models/blog");
const {postComment} = require('../controllers/commentControllers');

router.post("/blogs/:id/comment",postComment);
	


module.exports = router;