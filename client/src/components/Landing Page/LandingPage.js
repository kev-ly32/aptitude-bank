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
  const openPopup = () => {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
  };
  const closePopup = () => {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
  };

  window.onclick = (e) => {
    let popup = document.getElementById("popup");
    if (e.target === popup) {
      popup.style.display = "none";
    }
  };

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
              <button
                href="#popup"
                id="intro-button"
                className="intro-button"
                onClick={openPopup}
              >
                Learn More
              </button>
            </Link>
            <div id="popup" className="popup">
              <div className="popup-content">
                <span className="close" onClick={closePopup}>
                  &times;
                </span>
                <div>
                  <p>
                    Open a savings account with Apittude Bank today to earn a{" "}
                    <b>non-promotional</b> interest rate of 1.90% - 19x higher
                    than the competition
                  </p>
                  <p>
                    Plus, open both a savings and chequing account and receive a
                    $300 cash deposit, on us!
                  </p>
                </div>

                <p>* Offer ends December 31st, 2021</p>
                <Link to="/register">Sign up today!</Link>
              </div>
            </div>
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
