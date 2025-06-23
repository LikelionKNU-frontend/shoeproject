// src/App.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import './App.css'; // 앱 전체에 적용될 스타일

function App() {
  // 장바구니 상태를 App 컴포넌트에서 관리
  // cartItems는 { id, name, price, quantity, imageUrl } 형태의 객체 배열
  const [cartItems, setCartItems] = useState([]);

  // --- 장바구니 관련 함수들 ---

  // 장바구니에 아이템을 추가하는 함수
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      // 이미 장바구니에 있는 상품인지 확인
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        // 이미 있으면 수량만 증가
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 없으면 새로 추가 (초기 수량은 1)
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  // 장바구니 아이템 수량 조절 함수
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0) // 수량이 0 이하면 목록에서 제거
    );
  };

  // 장바구니에서 아이템 삭제 함수
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className="App">
        {/* 모든 페이지에서 공통으로 사용될 헤더 (선택 사항: 각 페이지에 넣거나 따로 컴포넌트화 가능) */}
        <header className="main-header">
          <div className="header-left">
            <Link to="/" className="site-title">
              언제사슈
            </Link>
          </div>
          <div className="header-right">
            <Link to="/cart" className="cart-link">
              장바구니 ({cartItems.reduce((total, item) => total + item.quantity, 0)})
            </Link>
          </div>
        </header>
        <hr/> 

        {/* 페이지 라우팅 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:id"
            element={<ProductDetailPage addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;