import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../public/stylesheets/Navbar.css";
import { selectUser, logout } from "../../reducers/Authentication/userSlice";
import { logout2 } from "../../reducers/Account/accountSlice";

function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await fetch("/logout", {
      method: "GET",
    });
    dispatch(logout());
    dispatch(logout2());
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          Aptitude Bank
        </Link>
        <nav>
          {user ? (
            <li className="nav-link">
              <Link to="/dashboard">
                <button>Dashboard</button>
              </Link>
            </li>
          ) : null}
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
                <button onClick={handleLogout} className="login-button">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
