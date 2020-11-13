import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Auth.css";

import { authenticate } from "../../reducers/Authentication/userSlice";

function Login() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
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
    if (userInfo.username === "" || userInfo.password === "") {
      return setErr("Missing information");
    }
    try {
      const response = await dispatch(authenticate(userInfo));
      unwrapResult(response);
      localStorage.setItem("user", JSON.stringify(response.payload));
    } catch (error) {
      setErr(error.message);
    }
  };

  //if user sees this page they must be logged out - clear data in storage
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="auth-form">
      <h2 className="form-header">Log In</h2>
      <h3 className="errorMessage">{err}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              autoFocus
              className={`form-input ${
                err && userInfo.username === "" ? "error" : null
              }`}
              id="email"
              type="email"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              className={`form-input ${
                err && userInfo.password === "" ? "error" : null
              }`}
              id="password"
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
