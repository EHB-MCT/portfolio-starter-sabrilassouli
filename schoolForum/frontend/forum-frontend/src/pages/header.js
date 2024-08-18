import React from "react";
import { useNavigate } from "react-router-dom";
import "./../css/header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <header className="header-container">
      <button className="home-button" onClick={handleHomeClick}>
        Home{" "}
      </button>{" "}
    </header>
  );
};

export default Header;
