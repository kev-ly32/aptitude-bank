import React from "react";
import { Link } from "react-router-dom";
import "../../public/stylesheets/Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          Aptitude Bank
        </Link>
        <nav>
          <ul className="nav-links">
            <li className="nav-link">
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/register">
                <button className="register-button">Sign Up</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
