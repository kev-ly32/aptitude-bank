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

function AccountDetails() {
  const user = useSelector(selectUser);
  const allAccounts = useSelector(selectAccount);
  const totalBalance = allAccounts.reduce(
    (total, current) => total + current.balance / 100,
    0
  );
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
    </div>
  );
}

export default AccountDetails;
