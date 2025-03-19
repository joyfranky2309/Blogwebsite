import React from 'react';
import { useNavigate } from "react-router-dom";
import "../components/styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="dashboard-sidebar">
      <nav>
        <ul>
          <li><a onClick={() => navigate("/dashboard")}>Home</a></li>
          <li><a onClick={() => navigate("/learn")}>Learn</a></li>
          <li><a onClick={() => navigate("/add_blog")}>Create Blog</a></li>
          <li><a onClick={() => navigate("/profile")}>Profile</a></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;