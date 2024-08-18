import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../css/header.css";

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); 
  };

  const handleLoginClick = () => {
    setShowLoginForm(true); 
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false); 
  };

  const handleSignupClick = () => {
    setShowSignupForm(true); 
  };

  const handleCloseSignupForm = () => {
    setShowSignupForm(false); 
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleSignupFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <header className="header-container">
      <button className="home-button" onClick={handleHomeClick}>
        Home
      </button>
      <div className="title">Forum Title</div>
      <div className="auth-buttons">
        <button className="login-button" onClick={handleLoginClick}>
          Log In
        </button>
        <button className="signup-button" onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
      {showLoginForm && (
        <div className="modal">
          <div className="form-container">
            <button className="close-button" onClick={handleCloseLoginForm}>
              &times;
            </button>
            <form className="form" onSubmit={handleLoginFormSubmit}>
              <label>
                Username:
                <input type="text" name="username" required />
              </label>
              <label>
                Password:
                <input type="password" name="password" required />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {showSignupForm && (
        <div className="modal">
          <div className="form-container">
            <button className="close-button" onClick={handleCloseSignupForm}>
              &times;
            </button>
            <form className="form" onSubmit={handleSignupFormSubmit}>
              <label>
                Username:
                <input type="text" name="username" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Password:
                <input type="password" name="password" required />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
