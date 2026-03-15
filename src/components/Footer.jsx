import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div className="foot-col">
          <span className="foot-logo-big">BACK ALLEY BOYZ™</span>
          <p>Streetwear từ Sài Gòn. Được làm bởi những đứa sống ở hẻm, chơi ngoài đường, và không theo lối mòn.</p>
        </div>
        <div className="foot-col">
          <h4>Liên kết</h4>
          <a href="https://www.instagram.com/backalleyboyz.world/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="foot-col">
          <h4>Liên hệ</h4>
          <a href="https://www.instagram.com/backalleyboyz.world/" target="_blank" rel="noopener noreferrer">@backalleyboyz.world</a>
          <a href="#">In lụa custom</a>
        </div>
      </div>
      <div className="foot-bottom">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span className="foot-copy">© Back Alley Boyz™ · Saigon · All rights reserved</span>
          <span className="foot-copy" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Developed by <a href="https://github.com/trinhhvu/BAB" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>trinhhvu</a> · 
            Contact: <a href="https://www.instagram.com/uvhhnirt/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>@uvhhnirt</a>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span className="foot-copy">Made with vibes 🐀</span>
          <Link to="/admin" className="foot-copy" style={{ textDecoration: 'none', opacity: 0.3 }}>[ ADMIN ]</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
