import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';

function Menu({ isOpen, onClose }) {
  return (
    <div id="menu-overlay" className={isOpen ? 'open' : ''}>
      <div className="menu-top">
        <span className="menu-brand">BACK ALLEY BOYZ™</span>
        <button className="menu-x" onClick={onClose}>[ ĐÓNG ]</button>
      </div>
      <ul className="menu-nav">
        <li>
          <Link to="/" onClick={onClose}>
            <span className="nav-en">SHOP</span>
            <span className="nav-vi">Mua sắm</span>
          </Link>
        </li>
        <li>
          <Link to="/lookbook" onClick={onClose}>
            <span className="nav-en">LOOKBOOK</span>
            <span className="nav-vi">Bộ sưu tập</span>
          </Link>
        </li>
        <li>
          <Link to="/popup" onClick={onClose}>
            <span className="nav-en">POP-UP</span>
            <span className="nav-vi">Sự kiện</span>
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={onClose}>
            <span className="nav-en">ABOUT</span>
            <span className="nav-vi">Về chúng tôi</span>
          </Link>
        </li>
      </ul>
      <div className="menu-foot">
        <a href="#">Instagram</a>
        <a href="#">TikTok</a>
        <a href="#">Bảng size</a>
        <a href="#">Chính sách đổi trả</a>
        <a href="#">Liên hệ</a>
      </div>
    </div>
  );
}

export default Menu;
