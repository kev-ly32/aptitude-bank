import React from "react";
import { Link } from "react-router-dom";
import "../../public/stylesheets/Footer.css";

const socials = ["Facebook", "Twitter", "LinkedIn"];
const footerNav = ["Accounts", "Investments", "Credit Cards", "Contact"];

function Footer() {
  return (
    <footer>
      <section className="footer-section">
        <ul className="footer-social">
          {socials.map((social) => (
            <a
              key={social}
              className="footer-item"
              href={`https://${social.toLowerCase()}.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>{social}</li>
            </a>
          ))}
        </ul>
      </section>
      <section className="footer-section">
        <ul className="footer-nav">
          {footerNav.map((page) => (
            <Link
              className="footer-item"
              key={page}
              to={`/${page.toLowerCase()}`}
            >
              <li>{page}</li>
            </Link>
          ))}
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
