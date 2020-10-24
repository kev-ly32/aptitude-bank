import React from "react";
import "../../public/stylesheets/Auth.css";

function Login(props) {
  return (
    <div className="auth-form">
      <h2 className="form-header">Log In</h2>
      <form>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="card-number">Card Number</label>
            <input
              autoFocus
              className="form-input"
              id="card-number"
              required
              type="text"
              name="card-number"
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
        <button className="auth-submit" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
