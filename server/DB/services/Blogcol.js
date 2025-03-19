const express = require("express");
const router = express.Router();
const connectDB = require("../../DB/connector");
const Blog = require("../../models/Blog");

connectDB();

const createBlog = async (req, res) => {
    try {
        const newBlog = new Blog({ ...req.body, author: req.user.id });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const getUserBlogs = async (req, res) => {
    try {
        console.log(req.params);
        const blogs = await Blog.find({ author: req.params.user });
        console.log(blogs);
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 }) // Sort by creation date in descending order (latest first)
            .limit(12); // Limit the results to 12 blogs
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Get a blog by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.status(200).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.status(200).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        // Check if the user is an admin or the author of the blog
        if (req.user.role !== "admin" && blog.author.toString() !== req.user.id) {
            return res.status(403).send("You do not have permission to delete this blog");
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).send("Blog Deleted Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        blog.likes += 1;
        await blog.save();

        res.status(200).json({ message: "Blog liked successfully", likes: blog.likes });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const toggleLikeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        const userId = req.user.id;
        if (blog.likedBy.includes(userId)) {
            blog.likes -= 1;
            blog.likedBy = blog.likedBy.filter((id) => id.toString() !== userId);
        } else {
            blog.likes += 1;
            blog.likedBy.push(userId);
        }

        await blog.save();

        res.status(200).json({ likes: blog.likes, liked: blog.likedBy.includes(userId) });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const addComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        const newComment = {
            author: req.user.id,
            content: req.body.content,
        };

        blog.comments.push(newComment);
        await blog.save();

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const deleteComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        // Find the index of the comment to delete
        const commentIndex = blog.comments.findIndex(
            (comment) => comment._id.toString() === req.params.commentId
        );

        if (commentIndex === -1) {
            return res.status(404).send("Comment not found");
        }

        // Check if the user is the author of the comment or an admin
        if (
            req.user.role !== "admin" &&
            blog.comments[commentIndex].author.toString() !== req.user.id
        ) {
            return res.status(403).send("You do not have permission to delete this comment");
        }

        // Use splice to remove the comment
        blog.comments.splice(commentIndex, 1);
        await blog.save();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const getBlogDetails = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("comments.author", "username") // Populate the author field in comments with the username
            .populate("author", "username"); // Populate the blog author with the username

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        res.status(200).json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const searchBlogs = async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from the request
        const searchRegex = new RegExp(query, 'i'); // Case-insensitive regex for search

        // Search for blogs by title, topics, or author name
        const blogs = await Blog.find({
            $or: [
                { title: searchRegex }, // Match title
                { topics: { $regex: searchRegex } }, // Match topics
            ],
        })
        .populate("author", "username") // Populate the author's username
        .sort({ createdAt: -1 }); // Sort by latest blogs first

        res.status(200).json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getUserBlogs, likeBlog, toggleLikeBlog, addComment, deleteComment, getBlogDetails, searchBlogs };