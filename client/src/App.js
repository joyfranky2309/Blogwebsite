import logo from './logo.svg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navi=useNavigate();

  return (
    <div>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard navi={navi}/>} />
          </>
        ) : (
          <>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
