import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Forms.css";

import { selectAccount, etransfer } from "../../reducers/Account/accountSlice";
import { Link, useHistory } from "react-router-dom";

function Transfer() {
  const [accountInfo, setAccountInfo] = useState({
    amount: "",
    account: "",
    email: "",
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

  const checkBalance = async (amount, account, email) => {
    const [selectedAccount] = allAccounts.filter(
      (account) => account._id === accountInfo.account
    );
    if (accountInfo.amount * 100 > selectedAccount.balance) {
      return setErr(
        `Cannot exceed more than the current balance of  $${(
          selectedAccount.balance / 100
        ).toFixed(2)}`
      );
    }
    try {
      const response = await dispatch(
        etransfer({
          account,
          email,
          amount: amount * 100,
        })
      );
      unwrapResult(response);
      history.push("/dashboard");
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleSubmit = (e) => {
    const { amount, account, email } = accountInfo;
    e.preventDefault();

    if (amount <= 0 || account === "" || email === "") {
      return setErr("Required information");
    }
    checkBalance(amount, account, email);
  };

  return (
    <div className="auth-form">
      <Link className="backButton" to="/dashboard">
        <i className="fas fa-long-arrow-alt-left"></i>
      </Link>
      <div className="form-header-info-transaction ">
        <h2 className="form-header">Send e-Transfer</h2>
        <h3 className="errorMessage">{err}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="account">From: </label>
            <select
              id="account"
              name="account"
              value={accountInfo.account}
              onChange={handleChange}
              className={err && accountInfo.account === "" ? "error" : null}
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
            <label htmlFor="email">Email of Recipient</label>
            <input
              autoFocus
              className={`form-input ${
                err && accountInfo.email === "" ? "error" : null
              }`}
              id="email"
              type="email"
              name="email"
              value={accountInfo.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="amount">Amount</label>
            <input
              className={`form-input ${
                err && accountInfo.amount <= 0 ? "error" : null
              }`}
              id="amount"
              type="number"
              name="amount"
              min="0.01"
              step="0.01"
              placeholder="$"
              value={accountInfo.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="auth-submit" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Transfer;
