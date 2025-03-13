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

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
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

        await blog.remove();
        res.status(200).send("Blog Deleted Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };