const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../../DB/services/Blogcol");
const verifyToken = require("../../middleware/authMiddleware");

router.post("/blogs", verifyToken, createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", verifyToken, updateBlog);
router.delete("/blogs/:id", verifyToken, deleteBlog);

module.exports = router;