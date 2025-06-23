import React, { useEffect, useState } from "react";
import "./Cart.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);

  //localStorage에서 데이터 불러오기
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Cart")) || [];

    //selected 값(선택박스)이 없으면 기본값 true로 설정, 오류 방지
    const initialized = data.map((item) => ({
      ...item,
      selected: item.selected !== undefined ? item.selected : true,
    }));
    setCartItems(initialized);
  }, []);

  // 수량 변경
  const handleQuantityChange = (id, size, type) => {
    const updated = cartItems.map((item) => {
      if (item.id === id && item.size === size) {
        let newQuantity =
          type === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("Cart", JSON.stringify(updated));
  };

  // 장바구니 삭제
  const handleRemove = (id, size) => {
    const updated = cartItems.filter(
      (item) => !(item.id === id && item.size === size)
    );
    setCartItems(updated);
    localStorage.setItem("Cart", JSON.stringify(updated));
  };

  // 개별 선택 체크박스
  const toggleSelect = (id, size) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.size === size
        ? { ...item, selected: !item.selected }
        : item
    );
    setCartItems(updated);
  };

  // 전체 선택 체크박스
  const toggleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    const updated = cartItems.map((item) => ({ ...item, selected: newState }));
    setCartItems(updated);
  };

  // 선택된 상품들만 필터링
  const selectedItems = cartItems.filter((item) => item.selected);

  // 선택된 상품들의 총 결제 금액 계산
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0 // 초기값
  );

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      <hr />
      <table className="cart-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox"
                checked={
                  selectedItems.length === cartItems.length &&
                  cartItems.length > 0
                }
                onChange={toggleSelectAll}
              />
              전체 선택
            </th>
            <th>상품 정보</th>
            <th>수량</th>
            <th>구매가</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="5">장바구니가 비어 있습니다.</td>
            </tr>
          ) : (
            cartItems.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelect(item.id, item.size)}
                  />
                </td>
                <td className="productInfo">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <div>{item.name}</div>
                    <div>사이즈 {item.size}</div>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.size, "minus")
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.size, "plus")
                    }
                  >
                    +
                  </button>
                </td>
                <td>{(item.price * item.quantity).toLocaleString()}원</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleRemove(item.id, item.size)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedItems.length > 0 && (
        <div className="total">
          <div className="totalPrice">
            <span>총 예상 결제 금액</span>
            <strong>{total.toLocaleString()}원</strong>
          </div>
          <div className="totalProducts">
            <span>총 상품금액</span>
            <span>{total.toLocaleString()}원</span>
          </div>
          <div className="totalProducts">
            <span>배송비</span>
            <span>무료</span>
          </div>
          <button className="order-btn">주문하기</button>
        </div>
      )}
    </div>
  );
}
