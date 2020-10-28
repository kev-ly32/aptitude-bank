import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../public/stylesheets/Auth.css";

import { loginRegister } from "../../reducers/Authentication/userSlice";

function Register() {
  const [userInfo, setUserInfo] = useState({
    "first-name": "",
    "last-name": "",
    email: "",
    "sin-number": "",
    password: "",
    "confirm-password": "",
  });
  const [err, setErr] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo["confirm-password"]) {
      return setErr("Passwords do not match.");
    }
    try {
      await dispatch(loginRegister(userInfo));
    } catch (error) {
      return setErr(error);
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
            <label htmlFor="first-name">First Name</label>
            <input
              autoFocus
              className="form-input"
              id="first-name"
              required
              type="text"
              name="first-name"
              value={userInfo["first-name"]}
              onChange={handleChange}
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
              value={userInfo["last-name"]}
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
            <label htmlFor="sin-number">SIN Number</label>
            <input
              className="form-input"
              id="sin-number"
              required
              type="number"
              name="sin-number"
              value={userInfo["sin-number"]}
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
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="form-input"
              id="confirm-password"
              required
              type="password"
              name="confirm-password"
              value={userInfo["confirm-password"]}
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
