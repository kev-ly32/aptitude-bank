import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Auth.css";

import { selectAccount, deposit } from "../../reducers/Account/accountSlice";
import { useHistory } from "react-router-dom";

function Deposit() {
  const [accountInfo, setAccountInfo] = useState({
    balance: "",
    accountID: "",
  });
  const [err, setErr] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const allAccounts = useSelector(selectAccount);

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
          balance: Number(accountInfo.balance),
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
      <h2 className="form-header">Deposit</h2>
      <h3 className="errorMessage">{err}</h3>
      <form onSubmit={handleSubmit}>
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
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="password">Account: </label>
            <select
              name="accountID"
              value={accountInfo.name}
              onChange={handleChange}
              className={err && accountInfo.accountID === "" ? "error" : null}
            >
              <option value="">Select an account</option>
              {allAccounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.type === "savings"
                    ? "EVERYDAY SAVINGS - "
                    : "TFSA - "}
                  {account.id.toString()} &nbsp;
                  {account.balance.toLocaleString("en-EN", {
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
        <button className="auth-submit" type="submit">
          Deposit
        </button>
      </form>
    </div>
  );
}

export default Deposit;
