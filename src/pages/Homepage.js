import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";

const mainBanners = [
  {
    img: "images/con1.jpg",
    title: "스니커즈 아이콘",
    desc: "최대 50% 할인",
    brand: "컨버스",
  },
  {
    img: "images/dac1.jpg",
    title: "섬세한 실루엣",
    desc: "최대 60% 할인",
    brand: "닥터마틴",
  },
  {
    img: "images/cro1.jpg",
    title: "시원한 여름 신발",
    desc: "최대 50% 할인",
    brand: "크록스",
  },
];

function MainBanner() {
  return (
    <div className="main-banner-container">
      {mainBanners.map((b, idx) => (
        <div
          className="main-banner-card"
          key={idx}
          style={{ backgroundImage: `url(${b.img})` }}
        >
          <div className="main-banner-overlay">
            <div className="main-banner-text">
              <h2>{b.title}</h2>
              <div>{b.desc}</div>
              <div className="main-banner-brand">{b.brand}</div>
            </div>
            <div className="main-banner-logo"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <>
      <MainBanner />
      <div className="home-page-container">
        <h3 className="popular-shoes-title">인기 신발</h3>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
