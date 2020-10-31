import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../public/stylesheets/Navbar.css";
import { selectUser } from "../../reducers/Authentication/userSlice";

function Navbar() {
  const user = useSelector(selectUser);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          Aptitude Bank
        </Link>
        <nav>
          {!user ? (
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
          ) : (
            <ul className="nav-links">
              <li className="nav-link">
                <button className="login-button">Logout</button>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
