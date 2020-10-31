import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Auth.css";

import { authenticate } from "../../reducers/Authentication/userSlice";

function Register() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sinNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo["confirmPassword"]) {
      return setErr("Passwords do not match.");
    }
    try {
      const response = await dispatch(authenticate(userInfo));
      unwrapResult(response);
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-form">
      <h2 className="form-header">Register</h2>
      <h3>{err}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row form-row-multi">
          <div className="form-item-multi">
            <label htmlFor="firstName">First Name</label>
            <input
              autoFocus
              className="form-input"
              id="firstName"
              required
              type="text"
              name="firstName"
              value={userInfo["firstName"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-item-multi">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="form-input"
              id="lastName"
              required
              type="text"
              name="lastName"
              value={userInfo["lastName"]}
              onChange={handleChange}
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
              value={userInfo["email"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-item-multi form-sin">
            <label htmlFor="sinNumber">SIN Number</label>
            <input
              className="form-input"
              id="sinNumber"
              required
              type="number"
              name="sinNumber"
              value={userInfo["sinNumber"]}
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
              value={userInfo["password"]}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="form-input"
              id="confirmPassword"
              required
              type="password"
              name="confirmPassword"
              value={userInfo["confirmPassword"]}
              onChange={handleChange}
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
