import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Forms.css";

import { selectAccount, deposit } from "../../reducers/Account/accountSlice";
import { Link, useHistory } from "react-router-dom";

function Deposit() {
  const [accountInfo, setAccountInfo] = useState({
    balance: "",
    accountID: "",
  });
  const [err, setErr] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const allAccounts = useSelector(selectAccount);
  const sortedAccounts = allAccounts.slice().sort((a, b) => {
    if (a.type < b.type) {
      return 1;
    }
    if (a.type > b.type) {
      return -1;
    }
    return 0;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accountInfo.balance <= 0 || accountInfo.accountID === "") {
      return setErr("Required information");
    }
    try {
      const response = await dispatch(
        deposit({
          id: accountInfo.accountID,
          balance: accountInfo.balance * 100,
        })
      );
      unwrapResult(response);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-form">
      <Link className="backButton" to="/dashboard">
        <i className="fas fa-long-arrow-alt-left"></i>
      </Link>
      <div className="form-header-info-transaction ">
        <h2 className="form-header">Deposit</h2>
        <h3 className="errorMessage">{err}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="account">Account: </label>
            <select
              id="account"
              name="accountID"
              value={accountInfo.name}
              onChange={handleChange}
              className={err && accountInfo.accountID === "" ? "error" : null}
            >
              <option value="">Select an account</option>
              {sortedAccounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.type === "savings"
                    ? "EVERYDAY SAVINGS - "
                    : "TFSA - "}
                  {account.id.toString()} &nbsp;
                  {(account.balance / 100).toLocaleString("en-EN", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="amount">Amount</label>
            <input
              autoFocus
              className={`form-input ${
                err && accountInfo.balance <= 0 ? "error" : null
              }`}
              id="amount"
              type="number"
              name="balance"
              min="0.01"
              step="0.01"
              placeholder="$"
              value={accountInfo.balance}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="auth-submit" type="submit">
          Deposit
        </button>
      </form>
    </div>
  );
}

export default Deposit;
