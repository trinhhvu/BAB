import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home({ products, onAddToCart }) {
  const [filter, setFilter] = useState('all');

  const marqueeItems = [
    "BACK ALLEY BOYZ™", "FRESH CLOTHES", "VIBES", "SAIGON WORLDWIDE",
    "CUSTOM SCREEN PRINT", "UNDERGROUND SPIRIT", "STREETWEAR CULTURE",
    "BACK ALLEY BOYZ™", "FRESH CLOTHES", "VIBES", "SAIGON WORLDWIDE"
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.cat === filter);

  // Function to create a URL slug from product name
  const getSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  return (
    <main>
      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="mq-item">
              <span className="mq-dot"></span>
              {item}
            </div>
          ))}
        </div>
      </div>


      {/* Shop section */}
      <div id="shop" className="sec-hd">
        <span className="sec-title">SHOP</span>
        <span className="sec-count">({filteredProducts.length})</span>
        <div className="sec-filters">
          <button className={`fbtn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>TẤT CẢ</button>
          <button className={`fbtn ${filter === 'tee' ? 'active' : ''}`} onClick={() => setFilter('tee')}>TOPS</button>
          <button className={`fbtn ${filter === 'acc' ? 'active' : ''}`} onClick={() => setFilter('acc')}>PHỤ KIỆN</button>
        </div>
      </div>

      {/* Product grid */}
      <div className="pgrid">
        {filteredProducts.map(p => (
          <Link to={`/product/${getSlug(p.name)}`} key={p.id} className={`pcard ${p.soldout ? 'soldout' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="pc-img-wrap">
              <img src={'/' + p.img} alt={p.name} className="pc-img-main" />
              <img src={'/' + (p.imgHover || (p.gallery && p.gallery.length > 1 ? p.gallery[1] : p.img))} alt={p.name} className="pc-img-hover" />
              {p.badge && <span className={`pc-badge ${p.badge}`}>{p.badge}</span>}
              {p.soldout && <div className="pc-soldout"><span>HẾT HÀNG</span></div>}
              {!p.soldout && (
                <button className="pc-add" onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart(p.variants[0]);
                }}>+ THÊM VÀO GIỎ</button>
              )}
            </div>
            <div className="pc-info">
              <div className="pc-name">{p.name}</div>
              <div className="pc-var">
                {p.variants.length > 0 ? `${p.variants.length} màu sắc` : ''}
              </div>
              <div className="pc-foot">
                <div className="pc-price">{p.price.toLocaleString()}đ</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Home;
