import React from "react";
import { Link } from "react-router-dom";
import "../../public/stylesheets/Products.css";

const Product = ({ productName, description }) => {
  return (
    <div className="product-container">
      <div className="product-info">
        {productName}
        <Link to="/register">
          <button className="product-button">Register</button>
        </Link>
      </div>
      <div className="product-description">
        <ul>{description}</ul>
      </div>
    </div>
  );
};
const ProductReverse = ({ productName, description }) => {
  return (
    <div className="product-container">
      <div className="product-description">
        <ul>{description}</ul>
      </div>
      <div className="product-info">
        {productName}
        <Link to="/register">
          <button className="product-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

function Products() {
  return (
    <div className="productPage">
      <section className="productPageHeader">
        <h1>Explore our products</h1>
      </section>
      <section className="productPageProducts">
        <Product
          productName={
            <>
              <i className="fas fa-piggy-bank"></i>
              <h1 className="product-name">Savings Account</h1>
            </>
          }
          description={
            <>
              <li>High Interest</li>
              <li>No minimum balance</li>
              <li>Free e-Transfers</li>
              <li>Zero fees</li>
            </>
          }
        />
        <ProductReverse
          productName={
            <>
              <i className="fas fa-money-bill-wave"></i>
              <h1 className="product-name">Chequing Account</h1>
            </>
          }
          description={<li>Coming soon!</li>}
        />
        <Product
          productName={
            <>
              <i className="fas fa-chart-line"></i>
              <h1 className="product-name">TFSA</h1>
            </>
          }
          description={
            <>
              <li>Tax-free growth</li>
              <li>Free withdrawals</li>
              <li>Hassle-free setup</li>
            </>
          }
        />
        <ProductReverse
          productName={
            <>
              <i className="far fa-credit-card"></i>
              <h1 className="product-name">Credit Cards</h1>
            </>
          }
          description={<li>Coming soon!</li>}
        />
      </section>
    </div>
  );
}

export default Products;
