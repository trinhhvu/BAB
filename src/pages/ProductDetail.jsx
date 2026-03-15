import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail({ products, onAddToCart }) {
  const { slug } = useParams();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');

  // Find the product group by slug
  const getSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const productGroup = products.find(p => getSlug(p.name) === slug);

  useEffect(() => {
    if (productGroup) {
      const initialVariant = productGroup.variants[0];
      setSelectedVariant(initialVariant);
      setMainImage(initialVariant.img);
      if (initialVariant.sizes && initialVariant.sizes.length > 0) {
        setSelectedSize(initialVariant.sizes[0]);
      } else {
        setSelectedSize('');
      }
    }
  }, [productGroup, slug]);

  if (!productGroup || !selectedVariant) {
    return <div className="p-20 text-center">Sản phẩm không tồn tại. <Link to="/">Quay lại cửa hàng</Link></div>;
  }

  const handleAddToCart = () => {
    const itemToAdd = { 
      ...selectedVariant, 
      name: productGroup.name, // Quan trọng: lấy tên gốc của nhóm sản phẩm
      size: selectedSize 
    };
    onAddToCart(itemToAdd);
  };

  return (
    <main className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">SHOP</Link> / {productGroup.cat === 'tee' ? 'TOPS' : 'PHỤ KIỆN'} / {productGroup.name}
      </div>

      <div className="pd-container">
        {/* Gallery Section */}
        <div className="pd-gallery">
          <div className="pd-main-img">
            <img src={'/' + mainImage} alt={productGroup.name} />
          </div>
          <div className="pd-thumbs">
            {selectedVariant.gallery && selectedVariant.gallery.map((img, idx) => (
               <img 
                 key={idx}
                 src={'/' + img} 
                 alt={`thumb-${idx}`} 
                 onClick={() => setMainImage(img)}
                 className={mainImage === img ? 'active' : ''}
               />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="pd-info">
          <h1 className="pd-name">{productGroup.name}</h1>
          <div className="pd-variant-name">{selectedVariant.variant}</div>
          <div className="pd-price">{selectedVariant.price.toLocaleString()}đ</div>
          
          <div className="pd-divider"></div>

          <div className="pd-desc">
            {selectedVariant.desc.split('.').filter(line => line.trim() !== '').map((line, idx) => (
              <p key={idx}>{line.trim()}.</p>
            ))}
          </div>

          {/* Variant Selection (shown for accessories like PINs, but hidden for Clothes as requested) */}
          {productGroup.cat !== 'tee' && productGroup.variants.length > 1 && (
            <div className="pd-variants">
              <span className="pd-label">MÀU SẮC / MẪU:</span>
              <div className="pd-v-list-row">
                {productGroup.variants.map((v, idx) => (
                  <button 
                    key={idx}
                    className={`v-btn-color ${selectedVariant.id === v.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedVariant(v);
                      setMainImage(v.img);
                    }}
                  >
                    {v.variant.includes('#') ? v.variant : v.variant.split('/')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection (if applicable) */}
          {selectedVariant.sizes && selectedVariant.sizes.length > 0 && (
            <div className="pd-variants">
              <span className="pd-label">SIZE:</span>
              <div className="pd-v-list-row">
                {selectedVariant.sizes.map((size, idx) => (
                  <button 
                    key={idx}
                    className={`v-btn-size ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pd-actions">
            <button 
              className="pd-add-btn" 
              onClick={handleAddToCart}
              disabled={selectedVariant.soldout}
            >
              {selectedVariant.soldout ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ HÀNG — ' + selectedVariant.price.toLocaleString() + 'đ'}
            </button>
          </div>

          <div className="pd-meta">
            <div className="meta-item">
              <strong>FREE SHIPPING</strong> cho đơn hàng từ 500k.
            </div>
            <div className="meta-item">
              <strong>ĐỔI TRẢ</strong> trong vòng 7 ngày nếu lỗi sản xuất.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
