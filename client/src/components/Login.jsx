import React from 'react';
import "../components/styles/Login.css";

function Login() {
  return (
    <div className="login-container">
        <h2>Login</h2>
        <form>
            <label>
            
            <input type="text" name="username" placeholder='username' />
            </label>
            <label>
            <input type="password" name="password" placeholder='password'/>
            </label>
            <button type="submit">Login</button>
        </form>
    </div>
  );
}

export default Login;