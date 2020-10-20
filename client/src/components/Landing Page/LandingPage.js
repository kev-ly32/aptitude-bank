import React from "react";
import "../../public/stylesheets/LandingPage.css";

function LandingPage() {
  return (
    <div>
      <section className="intro-banner">
        <div className="intro-banner-container">
          <div className="intro-text-button">
            <h1 className="intro-text">Take control of your finances</h1>
            <h3>Earn a non-promotional interest rate of 1.90%</h3>
            <h3>
              Plus, open both a chequing and savings account and receive a $300
              deposit*.
            </h3>
            <button className="intro-button">Learn More</button>
          </div>
          <img
            className="intro-image"
            src="https://res.cloudinary.com/de5gzocha/image/upload/v1603159705/Aptitude%20Bank/mom-and-kids_ze3ush.jpg"
          />
        </div>
      </section>
      <section className="landingPageProducts">
        <div className="productInfo">Savings Account</div>
        <div className="productInfo">Chequing Account</div>
        <div className="productInfo">Investments</div>
        <div className="productInfo">Credit Cards</div>
      </section>
    </div>
  );
}

export default LandingPage;
