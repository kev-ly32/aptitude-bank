import React from "react";
import "../../public/stylesheets/Footer.css";

function Footer(props) {
  return (
    <footer>
      <section className="footer-section">
        <ul className="footer-social">
          <li className="footer-item">Facebook</li>
          <li className="footer-item">Twitter</li>
          <li className="footer-item">LinkedIn</li>
        </ul>
      </section>
      <section className="footer-section">
        <ul className="footer-nav">
          <li className="footer-item">Accounts</li>
          <li className="footer-item">Investments</li>
          <li className="footer-item">Credit Cards</li>
          <li className="footer-item">Contact</li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
