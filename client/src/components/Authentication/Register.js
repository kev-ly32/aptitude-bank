import React from "react";
import "../../public/stylesheets/Auth.css";

function Register(props) {
  return (
    <div className="auth-form">
      <h2 className="form-header">Register</h2>
      <form>
        <div className="form-row form-row-multi">
          <div className="form-item-multi">
            <label htmlFor="first-name">First Name</label>
            <input
              autoFocus
              className="form-input"
              id="first-name"
              required
              type="text"
              name="first-name"
            />
          </div>
          <div className="form-item-multi">
            <label htmlFor="last-name">Last Name</label>
            <input
              className="form-input"
              id="last-name"
              required
              type="text"
              name="last-name"
            />
          </div>
        </div>
        <div className="form-row form-row-multi">
          <div className="form-item-multi form-email">
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              id="email"
              required
              type="email"
              name="email"
            />
          </div>
          <div className="form-item-multi form-sin">
            <label htmlFor="sin-number">SIN Number</label>
            <input
              className="form-input"
              id="sin-number"
              required
              type="number"
              name="sin-number"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              className="form-input"
              id="password"
              required
              type="password"
              name="password"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="form-input"
              id="confirm-password"
              required
              type="password"
              name="confirm-password"
            />
          </div>
        </div>
        <button className="auth-submit" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
