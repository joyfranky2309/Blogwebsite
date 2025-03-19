import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../components/styles/Dashboard.css";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blog/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Latest Blogs</h1>
      <main className="dashboard-main">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h2>{blog.title}</h2>
              <p>{blog.content.substring(0, 100)}...</p>
              <p><strong>Topics:</strong> {blog.topics.join(', ')}</p>
              <p><strong>Likes:</strong> {blog.likes}</p>
              <button
                className="read-more-btn"
                onClick={() => navigate(`/post/${blog._id}`)}
              >
                Read More
              </button>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </main>
    </div>
  );
}

export default Dashboard;