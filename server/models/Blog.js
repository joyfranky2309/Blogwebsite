const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    topics: {
        type: [String],
        default: [],
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId], // Array of user IDs who liked the blog
        ref: "User",
        default: [],
    },
    comments: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            content: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, {
    timestamps: true,
});

module.exports = mongoose.model("Blog", BlogSchema);