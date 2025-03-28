import React from 'react';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Property Finder</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;