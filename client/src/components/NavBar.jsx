import React, { useState } from 'react';
import "../components/styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const [loginClicked, setLoginClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);
  const nav = useNavigate();

  const handleLoginClick = () => {
    if (loginClicked) {
      setLoginClicked(false);
      nav("/");
    } else {
      setLoginClicked(true);
      setSignupClicked(false);
      nav("/login");
    }
  };

  const handleSignupClick = () => {
    if (signupClicked) {
      setSignupClicked(false);
      nav("/");
    } else {
      setSignupClicked(true);
      setLoginClicked(false);
      nav("/signup");
    }
  };

  const handleLogoutClick = () => {
    props.setLoggedIn(false);
    localStorage.clear("token");
    nav("/");
    window.location.reload();
  };

  return (
    <div className='navbar'>
      <h2 onClick={() => {
        nav("/");
        window.location.reload();
      }}>WriteWave</h2>
      {props.loggedIn ? (
        <div>
          <input type="text" placeholder="Search..." className="search-bar" />
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLoginClick}>
            {loginClicked ? "Back" : "Login"}
          </button>
          <button onClick={handleSignupClick}>
            {signupClicked ? "Back" : "Signup"}
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;