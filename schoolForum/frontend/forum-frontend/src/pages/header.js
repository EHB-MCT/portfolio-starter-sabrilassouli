import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./../css/header.css";

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieUserId = Cookies.get("userId");
    if (cookieUserId) {
      setIsLoggedIn(true);
      console.log("User ID from cookie:", cookieUserId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleHomeClick = () => {
    Cookies.remove("userId");
    navigate("/");
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };
  const handleLogoutClick = () => {
    Cookies.remove("userId");
    window.location.reload();
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

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        name: loginUsername,
        password: loginPassword,
      });

      console.log("Login successful:", response.data);
      setSuccess("Login successful!");
      setError("");

      Cookies.set("userId", response.data.userId, { expires: 1 });

      window.location.reload();
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed.");
      setSuccess("");
    }
  };

  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        name: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      console.log("Sign-up successful:", response.data);
      setSuccess("Sign-up successful!");
      setError("");
      // Optionally: Redirect or handle token storage here
    } catch (error) {
      console.error("Sign-up failed:", error);
      setError("Sign-up failed.");
      setSuccess("");
    }
  };

  return (
    <header className="header-container">
      {isLoggedIn ? (
        <div className="logged-in-header">
          <button className="home-button" onClick={handleHomeClick}>
            Home
          </button>
          <div className="title">Welcome Back!</div>
          <button className="logout-button" onClick={handleLogoutClick}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="logged-out-header">
          <button className="home-button" onClick={handleHomeClick}>
            Home
          </button>
          <div className="title">EHB FORUM</div>
          <div className="auth-buttons">
            <button className="login-button" onClick={handleLoginClick}>
              Log In
            </button>
            <button className="signup-button" onClick={handleSignupClick}>
              Sign Up
            </button>
          </div>
        </div>
      )}

      {showLoginForm && (
        <div className="modal">
          <div className="form-container">
            <button className="close-button" onClick={handleCloseLoginForm}>
              &times;
            </button>
            <form className="form" onSubmit={handleLoginFormSubmit}>
              <h2>Login</h2>
              <label>
                Username:
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </label>
              {error && <div className="error">{error}</div>}
              {success && <div className="success">{success}</div>}
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
              <h2>Sign Up</h2>
              <label>
                Username:
                <input
                  type="text"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </label>
              {error && <div className="error">{error}</div>}
              {success && <div className="success">{success}</div>}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
