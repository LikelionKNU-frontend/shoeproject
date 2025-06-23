// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    // Link 컴포넌트로 전체 카드를 감싸서 클릭 시 상세 페이지로 이동
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price.toLocaleString()}원</p>
      </div>
    </Link>
  );
}

export default ProductCard;