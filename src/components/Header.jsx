import React from 'react';
import { Link } from 'react-router-dom';

function Header({ cartCount, onToggleMenu, onToggleCart }) {
  return (
    <header>
      <div className="h-left">
        <button className="hbtn" onClick={onToggleMenu}>MENU</button>
      </div>

      <Link to="/" className="logo-wrap">
        <span className="logo-main">BACK ALLEY BOYZ™</span>
        <span className="logo-sub">Saigon · World</span>
      </Link>

      <div className="h-right">
        <button className="hbtn-bag" onClick={onToggleCart}>
          BAG (<span id="cart-count">{cartCount}</span>)
        </button>
      </div>
    </header>
  );
}

export default Header;
