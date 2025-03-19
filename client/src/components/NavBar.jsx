import React, { useState } from 'react';
import "../components/styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const [loginClicked, setLoginClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      nav(`/search?query=${encodeURIComponent(searchQuery)}`); // Navigate to search results page
    }
  };

  const handleClearSearch = () => {
    setSearchQuery(''); // Clear the search query
  };

  return (
    <div className='navbar'>
      <h2 onClick={() => {
        nav("/");
        window.location.reload();
      }}>WriteWave</h2>
      {props.loggedIn ? (
        <div className="navbar-actions">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={handleClearSearch}
                >
                  ✕
                </button>
              )}
            </div>
          </form>
          <button onClick={handleLogoutClick} className="logout-button">Logout</button>
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