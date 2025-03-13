import React from 'react';
import "../components/styles/Dashboard.css";

function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav>
            <ul>
              <li><a onClick={()=>props.navi("/dashboard")}>Home</a></li>
              <li><a onClick={()=>props.navi("/add_blog")}>Create Blog</a></li>
              <li><a onClick={()=>props.navi("/profile")}>Profile</a></li>
            </ul>
          </nav>
        </aside>
        <main className="dashboard-main">
          <div className="blog-post">
            <h2>Blog Title</h2>
            <p>Blog content goes here...</p>
          </div>
          <div className="blog-post">
            <h2>Another Blog Title</h2>
            <p>More blog content goes here...</p>
          </div>
          {/* Add more blog posts as needed */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;