import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Forms.css";

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
    if (Object.values(userInfo).some((info) => info === "")) {
      return setErr("Missing information");
    }
    if (userInfo.password !== userInfo["confirmPassword"]) {
      return setErr("Passwords do not match.");
    }
    try {
      const response = await dispatch(authenticate(userInfo));
      unwrapResult(response);
      localStorage.setItem("user", JSON.stringify(response.payload));
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
      <div className="form-header-info">
        <h2 className="form-header">Register</h2>
        <h3 className="errorMessage">{err}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row form-row-multi">
          <div className="form-item-multi">
            <label htmlFor="firstName">First Name</label>
            <input
              autoFocus
              className={`form-input ${
                err && userInfo.firstName === "" ? "error" : null
              }`}
              id="firstName"
              type="text"
              name="firstName"
              value={userInfo["firstName"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-item-multi">
            <label htmlFor="lastName">Last Name</label>
            <input
              className={`form-input ${
                err && userInfo.lastName === "" ? "error" : null
              }`}
              id="lastName"
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
              className={`form-input ${
                err && userInfo.email === "" ? "error" : null
              }`}
              id="email"
              type="email"
              name="email"
              value={userInfo["email"]}
              onChange={handleChange}
            />
          </div>
          <div className="form-item-multi form-sin">
            <label htmlFor="sinNumber">SIN Number</label>
            <input
              className={`form-input ${
                err && userInfo.sinNumber === "" ? "error" : null
              }`}
              id="sinNumber"
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
              className={`form-input ${
                err && userInfo.password === "" ? "error" : null
              }`}
              id="password"
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
              className={`form-input ${
                err && userInfo.confirmPassword === "" ? "error" : null
              }`}
              id="confirmPassword"
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
