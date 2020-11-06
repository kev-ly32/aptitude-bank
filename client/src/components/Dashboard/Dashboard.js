import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../public/stylesheets/Dashboard.css";

function Dashboard() {
  const { balance } = useSelector((state) => state.balance);
  return (
    <div>
      <section className="dashboard-intro">
        <h1>Welcome back, User</h1>
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
          <div className="account">
            <h3 className="account-type">
              Everyday Savings
              <span className="account-number">1678 3828394</span>
            </h3>
            <h4 className="account-balance">
              {balance.toLocaleString("en-EN", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h4>
          </div>
          <Link to="/savings/deposit">
            <button>Deposit</button>
          </Link>
          <h1 className="accounts-header">INVESTMENTS</h1>
          <div className="account">
            <h3 className="account-type">
              TFSA
              <span className="account-number">1678 3824628</span>
            </h3>
            <h4 className="account-balance">$5,288.93</h4>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
