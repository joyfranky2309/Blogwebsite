import logo from './logo.svg';
import React,{useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const login = () => {
    setLoggedIn(true)
  }
  const logout = () => {
    setLoggedIn(false)
  }
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
      
    </div>
   
  );
}

export default App;
