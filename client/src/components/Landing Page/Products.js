import React from "react";
import "../../public/stylesheets/Products.css";

const Product = ({ productName, description }) => {
  return (
    <div className="product-container">
      <div className="product-description">
        <h1>{productName}</h1>
        <h3>{description}</h3>
      </div>
      <div className="product-image">
        <h1>Image placeholder</h1>
      </div>
    </div>
  );
};
const ProductReverse = ({ productName, description }) => {
  return (
    <div className="product-container">
      <div className="product-image">
        <h1>Image placeholder</h1>
      </div>
      <div className="product-description">
        <h1>{productName}</h1>
        <h3>{description}</h3>
      </div>
    </div>
  );
};

function Products() {
  return (
    <div>
      <section className="productPageHeader">
        <h1>Explore our products</h1>
      </section>
      <section className="productPageProducts">
        <Product
          productName="Savings Account"
          description="Earn 1.90% interest on every dollar"
        />
        <ProductReverse
          productName="Chequing Account"
          description="For your everyday spending needs"
        />
        <Product
          productName="TFSA"
          description="Apititude Bank offers a TFSA to jumpstart your investments and help them grow tax-free"
        />
        <ProductReverse
          productName="Credit Cards"
          description="Take advantage of our no-annual-fee credit cashback credit card"
        />
      </section>
    </div>
  );
}

export default Products;
