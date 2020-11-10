import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import "../../public/stylesheets/Dashboard.css";

import {
  addAccount,
  fetchAccounts,
  selectAccount,
} from "../../reducers/Account/accountSlice";
import { selectUser } from "../../reducers/Authentication/userSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const allAccounts = useSelector(selectAccount);

  const addNewAccount = async (e) => {
    e.preventDefault();
    let type = "";
    let accountID = "";
    if (e.target.name === "savings") {
      type = "savings";
      accountID = "1525 ";
    } else {
      type = "investment";
      accountID = "1650 ";
    }
    const id = accountID + Math.floor(100000 + Math.random() * 900000);
    const data = { type, id, userID: user.sinNumber, balance: 0 };

    try {
      const response = await dispatch(addAccount(data));
      unwrapResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH ACCOUNTS ON RENDER
  useEffect(() => {
    if (!allAccounts[0]) {
      dispatch(fetchAccounts({ userID: user.sinNumber }));
    }
  }, [allAccounts, dispatch, user.sinNumber]);

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
          {allAccounts[0]
            ? allAccounts
                .filter((account) => account.type === "savings")
                .map((account) => (
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
          <Link to="/deposit">
            <button>Deposit</button>
          </Link>
          <h1 className="accounts-header">INVESTMENTS</h1>
          <button name="investments" onClick={addNewAccount}>
            + Add new investment
          </button>
          {allAccounts[0]
            ? allAccounts
                .filter((account) => account.type === "investment")
                .map((account) => (
                  <div key={account._id} className="account">
                    <h3 className="account-type">
                      TFSA
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
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
