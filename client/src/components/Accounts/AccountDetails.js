import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../public/stylesheets/Transactions.css";

import { selectAccount } from "../../reducers/Account/accountSlice";

function AccountDetails() {
  let { id } = useParams();
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
        <table className="transactions">
          <thead>
            <tr className="header">
              <th>Date</th>
              <th>Transaction</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentAcc.transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{new Date(transaction.date).toDateString()}</td>
                <td>{transaction.transaction}</td>
                <td>
                  {transaction.amount * 1 > 0
                    ? (transaction.amount / 100).toLocaleString("en-EN", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : null}
                </td>
                <td>
                  {transaction.amount * 1 < 0
                    ? ((transaction.amount * -1) / 100).toLocaleString(
                        "en-EN",
                        {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    : null}
                </td>
                <td>
                  {(transaction.newBalance / 100).toLocaleString("en-EN", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AccountDetails;
