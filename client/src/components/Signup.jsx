import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../components/styles/Signup.css";
import { register } from "../functionality/auth/Auth.js";

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
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
    register(formData.username, formData.password, formData.confirmPassword, navigate);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;