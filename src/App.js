import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  //장바구니

  const addToCart = (products, size, quantity) => {
    //상품 정보, 사이즈, 수량을 인자로 받음
    const exists = cartItems.find(
      (item) => item.id === products.id && item.size === size
    );
    const updated = exists //이미 장바구니에 있으면 수량 추가
      ? cartItems.map(
          (item) =>
            item.id === products.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item //다른 건 유지
        )
      : [
          ...cartItems, //기존 장바구니 복사
          { ...products, size, quantity, selected: true }, //새 상품 추가
        ];
    setCartItems(updated);
    localStorage.setItem("Cart", JSON.stringify(updated));
  };

  return (
    <Router>
      {/* 모든 페이지에서 공통으로 사용될 헤더 */}
      <div className="container">
        <header>
          <div className="header-left">
            <Link to="/" className="site-title">
              언제사슈
            </Link>
          </div>
          <div className="header-right">
            <Link to="/CartPage" className="cart-link">
              장바구니 (
              {cartItems.reduce((total, item) => total + item.quantity, 0)})
            </Link>
          </div>
        </header>
        <hr />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/product/:id"
          element={<ProductDetailPage addToCart={addToCart} />}
        />
        <Route path="/CartPage" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
