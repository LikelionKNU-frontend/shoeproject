// src/pages/CartPage.js
import React from 'react';

function CartPage({ cartItems, updateQuantity, removeFromCart }) {
  // 총 결제 금액 계산
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page-container">
      <h2>장바구니</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">장바구니가 비어있습니다.</p>
      ) : (
        <>
          <ul className="cart-item-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">{item.price.toLocaleString()}원</span>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1} // 수량이 1개 이하면 감소 버튼 비활성화
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      className="quantity-input"
                    />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <span className="cart-item-total">
                    총: {(item.price * item.quantity).toLocaleString()}원
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item-button"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>총 결제 금액: {calculateTotal().toLocaleString()}원</h3>
            <button className="checkout-button">주문하기</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;