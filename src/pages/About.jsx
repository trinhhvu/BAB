import React from 'react';

function About() {
  return (
    <main className="about-page">
      <div className="about-hero">
        <h1 className="hero-title">BACK ALLEY BOYZ™</h1>
        <p className="hero-sub">SAIGON · WORLDWIDE</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2 className="as-title">HẺM CỦA CHÚNG TÔI</h2>
          <p className="as-text">
            Được sinh ra từ những con hẻm sâu của Sài Gòn, Back Alley Boyz™ không chỉ là một thương hiệu thời trang. 
            Đó là nơi kết nối những tâm hồn tự do, những người sống ngoài đường phố và không bao giờ đi theo lối mòn.
          </p>
        </div>

        <div className="about-img-full">
          <img src="/images/popup.jpg" alt="BAB Vibe" />
        </div>

        <div className="about-grid">
          <div className="about-col">
            <h3 className="ac-label">KỸ THUẬT</h3>
            <p className="ac-text">Tất cả sản phẩm đều được in lụa thủ công (Screen-print) với sự tỉ mỉ trong từng chi tiết.</p>
          </div>
          <div className="about-col">
            <h3 className="ac-label">TẦM NHÌN</h3>
            <p className="ac-text">Mang văn hóa đường phố Việt Nam ra thế giới thông qua những thiết kế đậm chất bản địa.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
