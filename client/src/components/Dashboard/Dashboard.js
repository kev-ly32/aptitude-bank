import React from "react";
import "../../public/stylesheets/Dashboard.css";

function Dashboard(props) {
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
          <button>Pay Bill</button>
          <button>Send e-Transfer</button>
          <button>Investments</button>
          <button>Transfer money between accounts</button>
        </section>
        <section className="dashboard-content">
          <div>ACCOUNTS</div>
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
