import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../public/stylesheets/Forms.css";

import { selectAccount, setDefault } from "../../reducers/Account/accountSlice";
import { Link, useHistory } from "react-router-dom";

function Default() {
  const [account, setAccount] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (account === "") {
      return setErr("Required information");
    }
    try {
      await dispatch(setDefault(account));
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
        <h2 className="form-header">
          Which account would you like to make default?
        </h2>
        <h3 className="errorMessage">{err}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-item">
            <label htmlFor="account">Account: </label>
            <select
              id="account"
              name="accountID"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className={err && account === "" ? "error" : null}
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
        <button className="auth-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Default;
