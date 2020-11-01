import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Auth.css";

import { authenticate } from "../../reducers/Authentication/userSlice";

function Login() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(authenticate(userInfo));
      unwrapResult(response);
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <div className="auth-form">
      <h2 className="form-header">Log In</h2>
      <h3>{err}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              autoFocus
              className="form-input"
              id="email"
              required
              type="text"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
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
              value={userInfo.password}
              onChange={handleChange}
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
