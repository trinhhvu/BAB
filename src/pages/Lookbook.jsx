import React, { useState } from 'react';

function Lookbook({ products }) {
  const [cols, setCols] = useState(4);

  // Collect all gallery images from all products
  const allImages = products.reduce((acc, product) => {
    if (product.gallery && Array.isArray(product.gallery)) {
      const galleryImages = product.gallery.map(img => ({
        src: img.startsWith('/') ? img : '/' + img,
        alt: product.name
      }));
      return [...acc, ...galleryImages];
    }
    // Fallback to main image if no gallery
    return [...acc, { src: product.img.startsWith('/') ? product.img : '/' + product.img, alt: product.name }];
  }, []);

  return (
    <main className="lookbook-page">
      <div className="sec-hd">
        <span className="sec-title">LOOKBOOK</span>
        <span className="sec-count">({allImages.length})</span>
      </div>

      {/* Vertical Range Control */}
      <div className="lb-controls">
        <div className="lb-range-wrap">
          <span className="lb-range-val">{cols}</span>
          <input 
            type="range" 
            min="2" 
            max="8" 
            value={cols} 
            onChange={(e) => setCols(parseInt(e.target.value))} 
            className="lb-range-input"
          />
        </div>
      </div>
      
      <div className="lb-grid" style={{ 
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        '--lb-cols': cols 
      }}>
        {allImages.map((img, idx) => (
          <div key={idx} className="lb-item">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Lookbook;
