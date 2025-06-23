// src/pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetailPage({ addToCart }) {
  const { id } = useParams(); // URL 파라미터에서 상품 ID 추출
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    // 예시 데이터에서 ID에 맞는 상품 찾기 (HomePage의 dummyProducts와 동일해야 함)
    const dummyProducts = [
        { id: '1', name: '나이키 에어포스 1', price: 129000, description: '데일리 슈즈의 정석. 어떤 스타일에도 잘 어울리는 클래식 아이템입니다.', imageUrl: 'https://via.placeholder.com/400/FF5733/FFFFFF?text=AirForce1_Detail' },
        { id: '2', name: '아디다스 스탠스미스', price: 110000, description: '수십 년간 사랑받아온 아이코닉한 디자인. 깔끔하고 미니멀한 매력이 돋보입니다.', imageUrl: 'https://via.placeholder.com/400/33FF57/FFFFFF?text=StanSmith_Detail' },
        { id: '3', name: '뉴발란스 993', price: 239000, description: '뛰어난 쿠셔닝과 편안함으로 유명한 모델. 힙한 감성으로 많은 사랑을 받고 있습니다.', imageUrl: 'https://via.placeholder.com/400/5733FF/FFFFFF?text=NB993_Detail' },
        { id: '4', name: '컨버스 척 70', price: 95000, description: '오리지널 척테일러의 빈티지한 복각판. 견고한 만듦새와 레트로 디자인이 특징입니다.', imageUrl: 'https://via.placeholder.com/400/FF33E0/FFFFFF?text=Chuck70_Detail' },
        { id: '5', name: '반스 올드스쿨', price: 79000, description: '스케이트보드화의 전설. 측면 스트라이프가 인상적인 디자인입니다.', imageUrl: 'https://via.placeholder.com/400/33E0FF/FFFFFF?text=OldSkool_Detail' },
        { id: '6', name: '푸마 스웨이드', price: 89000, description: '50년 이상의 역사를 가진 푸마의 대표작. 스웨이드 소재의 고급스러운 느낌을 줍니다.', imageUrl: 'https://via.placeholder.com/400/E0FF33/FFFFFF?text=PumaSuede_Detail' },
        { id: '7', name: '리복 클럽 C 85', price: 99000, description: '테니스 헤리티지를 담은 클래식 스니커즈. 심플하고 세련된 스타일입니다.', imageUrl: 'https://via.placeholder.com/400/FF3380/FFFFFF?text=ClubC85_Detail' },
        { id: '8', name: '닥터마틴 1460', price: 210000, description: '펑크 록에서부터 스트릿 패션까지. 시대를 초월한 아이코닉한 부츠입니다.', imageUrl: 'https://via.placeholder.com/400/80FF33/FFFFFF?text=DocMartens_Detail' },
        { id: '9', name: '어그 태즈', price: 159000, description: '집 안팎에서 모두 편안하게 신을 수 있는 고급스러운 슬리퍼입니다.', imageUrl: 'https://via.placeholder.com/400/3380FF/FFFFFF?text=UGG+Tazz_Detail' },
        { id: '10', name: '크록스 클래식 클로그', price: 59000, description: '독특한 디자인과 뛰어난 편안함으로 전 세계를 사로잡은 신발입니다.', imageUrl: 'https://via.placeholder.com/400/FF8033/FFFFFF?text=Crocs_Detail' },
    ];
    const foundProduct = dummyProducts.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id]); // id가 변경될 때마다 상품을 다시 불러옴d

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // App.js에서 받은 addToCart 함수 호출
      alert(`${product.name}이(가) 장바구니에 추가되었습니다!`);
      navigate('/cart'); // 장바구니 페이지로 이동
    }
  };

  if (!product) {
    return <div className="loading">상품 정보를 불러오는 중...</div>;
  }

  return (
    <div className="product-detail-page-container">
      <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">{product.price.toLocaleString()}원</p>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          장바구니 담기
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;