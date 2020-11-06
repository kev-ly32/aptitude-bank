import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Auth.css";

function Deposit() {
  return (
    <div className="auth-form">
      <h2 className="form-header">Deposit</h2>
      {/* <h3>{err}</h3> */}
      <form>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="amount">Amount</label>
            <input
              autoFocus
              className="form-input"
              id="amount"
              required
              type="number"
              name="amount"
              step="0.01"
              //   value={userInfo.username}
              //   onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="password">Account</label>
            <input
              className="form-input"
              id="password"
              required
              type="password"
              name="password"
              //   value={userInfo.password}
              //   onChange={handleChange}
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

export default Deposit;
