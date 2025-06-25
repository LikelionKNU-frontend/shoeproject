import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetailPage({ addToCart }) {
  const { id } = useParams(); // url 파라미터에서 id
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.products.find((p) => p.id === parseInt(id));
        if (!found) {
          console.warn("상품을 찾을 수 없습니다. id:", id);
        }
        setProduct(found);

        if (Array.isArray(found.image)) {
          setSelectedImg(found.image[0]);
        }
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!size) return alert("사이즈를 선택해주세요.");

    if (product) {
      addToCart(product, size, quantity); // App.js에 있는 addToCart 함수 호출
      alert(`${product.name}이(가) 장바구니에 담겼습니다!`);
      navigate(0);
    }
  };

  if (!product) {
    return <div className="loading">상품 정보를 불러오는 중입니다.</div>;
  }

  return (
    <div>
      <div className="product-detail-page-container">
        <div className="image-section">
          <img
            src={selectedImg}
            alt={product.name}
            className="product-detail-image"
          />
          <div className="thumbnail-container">
            {product.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} 썸네일 ${idx + 1}`}
                className="thumbnail-image"
                onClick={() => setSelectedImg(img)}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-description">{product.description}</p>

          {/*  문자열로 포맷(11000원 -> 11,000원) */}
          <p className="product-price">{product.price.toLocaleString()}원</p>

          {/* 사이즈 선택 */}
          <label>
            사이즈 선택:
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">사이즈 선택</option>
              <option value="230">230</option>
              <option value="240">240</option>
              <option value="250">250</option>
              <option value="260">260</option>
              <option value="270">270</option>
              <option value="280">280</option>
            </select>
          </label>

          {/* 수량 선택 */}
          <div className="quantity-control">
            수량:
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <div className="flex">
            <button className="order-btn" style={{ padding: "10px" }}>
              주문하기
            </button>
            {/* 장바구니 담기 */}
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              장바구니
            </button>
          </div>
        </div>
      </div>
      <div
        className="detail"
        style={{ borderTop: "1px solid #eee", paddingTop: 18 }}
      >
        <span style={{ fontWeight: "bold" }}>상세정보</span>
        <div style={{ color: "#555", lineHeight: 1.5 }}>{product.detail}</div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
