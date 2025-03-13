const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 0,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BlogSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    author: {
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },

    content: {
        type: String,
        required: true,
        trim: true
    },
    likes:{
        type:Number,
        default:0
    },
    comments: [CommentSchema],
    reports: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Blog", BlogSchema);