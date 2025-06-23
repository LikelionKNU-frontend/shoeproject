import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="home-page-container">
      <h3 className="popular-shoes-title">인기 신발</h3>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
