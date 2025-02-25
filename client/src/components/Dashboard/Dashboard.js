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
  const totalBalance = allAccounts.reduce(
    (total, current) => total + current.balance / 100,
    0
  );

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
  }, []);

  return (
    <div>
      <section className="dashboard-intro">
        <h1>Welcome back, {user.firstName}</h1>
        <h1>
          Total balance:{" "}
          <span className="total-balance">
            {totalBalance.toLocaleString("en-EN", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </h1>
      </section>
      <section className="dashboard-main">
        <section className="dashboard-cta">
          <Link className="dashboard-button" to="/deposit">
            <i className="fas fa-coins"></i> Make a deposit
          </Link>
          <Link className="dashboard-button" to="/pay-bill">
            <i className="fas fa-receipt"></i>Pay Bills
          </Link>
          <Link to="/etransfer" className="dashboard-button">
            <i className="fas fa-location-arrow"></i>Send e-Transfer
          </Link>
          <Link to="/transfer" className="dashboard-button">
            <i className="fas fa-exchange-alt"></i>
            Transfer money between accounts
          </Link>
        </section>
        <section className="dashboard-content">
          <h1 className="accounts-header">EVERYDAY ACCOUNTS</h1>
          <button className="addAccount" name="savings" onClick={addNewAccount}>
            + Add new account
          </button>
          {allAccounts[0]
            ? allAccounts
                .filter((account) => account.type === "savings")
                .map((account) => (
                  <Link
                    className="account"
                    key={account._id}
                    to={`/account/${account.id}`}
                  >
                    <h3 className="account-type">
                      Everyday Savings
                      <span className="account-number">{account.id}</span>
                    </h3>
                    <h5>{account.default ? "Primary" : null}</h5>
                    <h4 className="account-balance">
                      {(account.balance / 100).toLocaleString("en-EN", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h4>
                  </Link>
                ))
            : null}
          <h1 className="accounts-header">INVESTMENTS</h1>
          <button
            className="addAccount"
            name="investments"
            onClick={addNewAccount}
          >
            + Add new investment
          </button>
          {allAccounts[0]
            ? allAccounts
                .filter((account) => account.type === "investment")
                .map((account) => (
                  <Link
                    className="account"
                    key={account._id}
                    to={`/account/${account.id}`}
                  >
                    <h3 className="account-type">
                      TFSA
                      <span className="account-number">{account.id}</span>
                    </h3>
                    <h5>{account.default ? "Primary" : null}</h5>
                    <h4 className="account-balance">
                      {(account.balance / 100).toLocaleString("en-EN", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h4>
                  </Link>
                ))
            : null}
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
