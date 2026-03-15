import React from 'react';
import './Cart.css';

function Cart({ isOpen, onClose, cartItems, onRemove, total }) {
  return (
    <div id="cart-overlay" className={isOpen ? 'open' : ''}>
      <div className="cart-bd" onClick={onClose}></div>
      <div className="cart-panel">
        <div className="cart-hd">
          <span className="cart-title">GIỎ HÀNG</span>
          <button className="cart-close" onClick={onClose}>[ ĐÓNG ]</button>
        </div>
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="cart-empty">TRỐNG — CHƯA CÓ SẢN PHẨM</p>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="cart-item">
                <div className="cart-img">
                  <img src={'/' + item.img} alt={item.name} />
                </div>
                <div className="cart-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-var">{item.variant} {item.size ? `— SIZE ${item.size}` : ''}</div>
                  <div className="ci-price">{item.price.toLocaleString()}đ</div>
                </div>
                <button className="ci-rm" onClick={() => onRemove(idx)}>×</button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div id="cart-ft">
            <div className="cart-ft-inner">
              <div className="cart-total-row">
                <span className="ct-label">Tổng cộng</span>
                <span className="ct-val">{total.toLocaleString()}đ</span>
              </div>
              <button className="checkout-btn">THANH TOÁN →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
