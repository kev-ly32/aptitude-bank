import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Dashboard.css";

import {
  addSavingsAccount,
  selectAccount,
} from "../../reducers/Account/accountSlice";
import { selectUser } from "../../reducers/Authentication/userSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const savingsAccount = useSelector(selectAccount);
  const tfsa = useSelector((state) => state.account.tfsa);

  const addNewAccount = async (e) => {
    e.preventDefault();
    let type = "";
    if (e.target.name === "savings") {
      type = "savings";
    } else {
      type = "tfsa";
    }
    const id = "1525 " + Math.floor(100000 + Math.random() * 900000);
    const data = { type, id, userID: user.sinNumber, balance: 0 };

    try {
      const response = await dispatch(addSavingsAccount(data));
      unwrapResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  //ADD USEEFFECT TO FETCH ACCOUNTS ON RENDER

  return (
    <div>
      <section className="dashboard-intro">
        <h1>Welcome back, {user.firstName}</h1>
        <h1>
          Total balance: <span className="total-balance">$15,789.46</span>
        </h1>
      </section>
      <section className="dashboard-main">
        <section className="dashboard-cta">
          <button className="dashboard-button">Pay Bill</button>
          <button className="dashboard-button">Send e-Transfer</button>
          <button className="dashboard-button">Investments</button>
          <button className="dashboard-button">
            Transfer money between accounts
          </button>
        </section>
        <section className="dashboard-content">
          <h1 className="accounts-header">EVERYDAY ACCOUNTS</h1>
          <button name="savings" onClick={addNewAccount}>
            + Add new account
          </button>
          {savingsAccount[0]
            ? savingsAccount.map((account) => (
                <div key={account._id} className="account">
                  <h3 className="account-type">
                    Everyday Savings
                    <span className="account-number">{account.id}</span>
                  </h3>
                  <h4 className="account-balance">
                    {account.balance.toLocaleString("en-EN", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h4>
                </div>
              ))
            : null}
          <Link to="/savings/deposit">
            <button>Deposit</button>
          </Link>
          <h1 className="accounts-header">INVESTMENTS</h1>
          <button name="tfsa" onClick={addNewAccount}>
            + Add new investment
          </button>
          {tfsa.next ? (
            <div className="account">
              <h3 className="account-type">
                TFSA
                <span className="account-number">1678 3824628</span>
              </h3>
              <h4 className="account-balance">$5,288.93</h4>
            </div>
          ) : null}
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
