const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getUserBlogs, likeBlog, toggleLikeBlog, addComment, deleteComment, searchBlogs } = require("../DB/services/Blogcol.js");
const verifyToken = require("../middleware/authMiddleware.js");

router.post("/blogs", verifyToken, createBlog);
router.get("/blogs", getAllBlogs);
router.get("/userblogs/:user", getUserBlogs);
router.get("/blogs/detail/:id", getBlogById);
router.put("/blogs/:id", verifyToken, updateBlog);
router.delete("/blogs/:id", verifyToken, deleteBlog);
router.post("/blogs/:id/like", verifyToken, toggleLikeBlog);
router.post("/blogs/:id/comment", verifyToken, addComment);
router.delete("/blogs/:blogId/comment/:commentId", verifyToken, deleteComment);
router.get("/blogs/search", searchBlogs);

module.exports = router;