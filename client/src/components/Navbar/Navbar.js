import React from "react";
import "../../public/stylesheets/Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <h2 className="nav-brand">Aptitude Bank</h2>
        <nav>
          <ul className="nav-links">
            <li className="nav-link">Login</li>
            <li className="nav-link">Sign Up</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
