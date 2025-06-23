// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // 홈 페이지 스타일

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 예시 데이터 (10개)
    const dummyProducts = [
      { id: '1', name: '나이키 에어포스 1', price: 129000, description: '데일리 슈즈의 정석', imageUrl: 'https://via.placeholder.com/200/FF5733/FFFFFF?text=AirForce1' },
      { id: '2', name: '아디다스 스탠스미스', price: 110000, description: '클래식한 디자인의 아이콘', imageUrl: 'https://via.placeholder.com/200/33FF57/FFFFFF?text=StanSmith' },
      { id: '3', name: '뉴발란스 993', price: 239000, description: '편안함과 스타일을 동시에', imageUrl: 'https://via.placeholder.com/200/5733FF/FFFFFF?text=NB993' },
      { id: '4', name: '컨버스 척 70', price: 95000, description: '빈티지 감성의 스테디셀러', imageUrl: 'https://via.placeholder.com/200/FF33E0/FFFFFF?text=Chuck70' },
      { id: '5', name: '반스 올드스쿨', price: 79000, description: '스케이트보드 문화의 상징', imageUrl: 'https://via.placeholder.com/200/33E0FF/FFFFFF?text=OldSkool' },
      { id: '6', name: '푸마 스웨이드', price: 89000, description: '역사와 전통의 스니커즈', imageUrl: 'https://via.placeholder.com/200/E0FF33/FFFFFF?text=PumaSuede' },
      { id: '7', name: '리복 클럽 C 85', price: 99000, description: '테니스 코트에서 영감을 받다', imageUrl: 'https://via.placeholder.com/200/FF3380/FFFFFF?text=ClubC85' },
      { id: '8', name: '닥터마틴 1460', price: 210000, description: '아이코닉한 워커 부츠', imageUrl: 'https://via.placeholder.com/200/80FF33/FFFFFF?text=DocMartens' },
      { id: '9', name: '어그 태즈', price: 159000, description: '따뜻하고 스타일리시한 슬리퍼', imageUrl: 'https://via.placeholder.com/200/3380FF/FFFFFF?text=UGG+Tazz' },
      { id: '10', name: '크록스 클래식 클로그', price: 59000, description: '편안함의 대명사', imageUrl: 'https://via.placeholder.com/200/FF8033/FFFFFF?text=Crocs' },
    ];
    setProducts(dummyProducts);
  }, []);

  return (
  <div>
    <div className="home-page-container">
      <h1 className="popular-shoes-title">인기 신발 👟</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
  );
}

export default HomePage;