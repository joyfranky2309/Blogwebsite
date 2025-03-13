import React from 'react';
import "../components/styles/Signup.css";

function Signup() {
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form>
        <label>
          Username:
          <input type="text" name="username" placeholder="Enter your username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" placeholder="Enter your password" />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" placeholder="Confirm your password" />
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;