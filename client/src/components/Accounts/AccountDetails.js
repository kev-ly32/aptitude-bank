import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  let { id } = useParams();
  const user = useSelector(selectUser);
  const allAccounts = useSelector(selectAccount);

  const [currentAcc] = allAccounts.filter((account) => account.id === id);

  return (
    <div>
      <section className="dashboard-intro">
        <h1>
          {currentAcc.type === "savings"
            ? `Everyday Savings ${currentAcc.id}`
            : `TFSA ${currentAcc.id}`}
        </h1>
        <h1>
          Account balance:{" "}
          <span className="total-balance">
            {(currentAcc.balance / 100).toLocaleString("en-EN", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </h1>
      </section>
      <section className="dashboard-main">
        <h1>Transactions</h1>
      </section>
    </div>
  );
}

export default AccountDetails;
