import logo from './logo.svg';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import CreateBlog from './components/CreateBlog';
import Post from './components/Post';
import SearchResults from './components/SearchResults';
import Learn from './components/Learn';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navi = useNavigate();
  useEffect(() => {
    // Check if the user is logged in when the app initializes
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {loggedIn ? (
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard navi={navi} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add_blog" element={<CreateBlog />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/learn" element={<Learn />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
