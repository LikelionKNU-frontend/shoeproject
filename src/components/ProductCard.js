// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import "../components/ProductCard.css";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price.toLocaleString()}원</p>
      </div>
    </Link>
  );
}

export default ProductCard;
