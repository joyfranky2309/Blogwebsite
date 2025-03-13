import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../components/styles/Login.css";
import { login } from "../functionality/auth/Auth.js";

function Login({ setLoggedIn }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.username, formData.password, navigate, setLoggedIn);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;