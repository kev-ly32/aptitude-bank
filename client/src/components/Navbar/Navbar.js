import React from "react";
import "../../public/stylesheets/Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <a href="/" className="nav-brand">
          Aptitude Bank
        </a>
        <nav>
          <ul className="nav-links">
            <li className="nav-link">
              <button className="login-button">Login</button>
            </li>
            <li className="nav-link">Sign Up</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
