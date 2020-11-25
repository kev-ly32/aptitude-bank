import React from "react";
import { Link } from "react-router-dom";
import "../../public/stylesheets/LandingPage.css";

const LandingProducts = ({ title, content }) => {
  return (
    <div className="landing-product">
      <h2>{title}</h2>
      <h4>{content}</h4>
      <div className="product-link-container">
        <Link className="product-link" to="/">
          <span className="product-link"> Learn More </span>
        </Link>
      </div>
    </div>
  );
};

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
            <Link to="/">
              <button className="intro-button">Learn More</button>
            </Link>
          </div>
          <img
            className="intro-image"
            src="https://res.cloudinary.com/de5gzocha/image/upload/v1603159705/Aptitude%20Bank/mom-and-kids_ze3ush.jpg"
            alt="intro"
          />
        </div>
      </section>
      <section className="landingPageProducts">
        <LandingProducts
          title="Savings"
          content="Let your money work while you rest"
        />
        <LandingProducts
          title="Chequing"
          content="No-fee daily chequing. Always ready when you are"
        />
        <LandingProducts
          title="Investments"
          content="Accelerate your savings. Fast-track your future"
        />
        <LandingProducts
          title="Credit Cards"
          content="Access exclusive perks when purchasing on credit"
        />
      </section>
    </div>
  );
}

export default LandingPage;
