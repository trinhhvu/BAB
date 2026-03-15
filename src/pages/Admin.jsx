import React, { useState, useEffect } from 'react';
import './Admin.css';
import { productService } from '../services/productService';
import { supabase } from '../supabaseClient';

function Admin({ onRefresh, allProducts }) {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    cat: 'tee',
    variant: '',
    desc: '',
    img: '',
    soldout: false
  });

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLogin(true);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Use products from props if available
  const displayProducts = allProducts || products;

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Đăng nhập thất bại: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    
    // Đảm bảo giá là số nguyên
    if (name === 'price') {
      newValue = parseInt(value, 10) || 0;
    }

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
        alert('Cập nhật thành công!');
      } else {
        await productService.addProduct(formData);
        alert('Thêm sản phẩm thành công!');
      }
      setEditingProduct(null);
      setFormData({ name: '', price: 0, cat: 'tee', variant: '', desc: '', img: '', soldout: false });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra!');
    }
  };

  const handleEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      price: p.price,
      cat: p.cat,
      variant: p.variant,
      desc: p.desc,
      img: p.img,
      soldout: p.soldout
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa không?')) {
      await productService.deleteProduct(id);
      if (onRefresh) onRefresh();
    }
  };

  if (!isLogin) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h2>QUẢN TRỊ BAB™</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email đăng nhập..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Nhập mật khẩu..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">VÀO HỆ THỐNG</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-hd">
        <h1>QUẢN LÝ SẢN PHẨM</h1>
        <button onClick={handleLogout}>ĐĂNG XUẤT</button>
      </div>

      <div className="admin-content">
        {/* Form Section */}
        <div className="admin-form-card">
          <h3>{editingProduct ? 'CHỈNH SỬA SẢN PHẨM' : 'THÊM SẢN PHẨM MỚI'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Giá (VNĐ)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Danh mục</label>
                <select name="cat" value={formData.cat} onChange={handleChange}>
                  <option value="tee">TOPS (Áo)</option>
                  <option value="acc">PHỤ KIỆN</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Phiên bản / Màu sắc</label>
              <input name="variant" value={formData.variant} onChange={handleChange} placeholder="VD: Trắng / White" />
            </div>
            <div className="form-group">
              <label>Đường dẫn ảnh (Public)</label>
              <input name="img" value={formData.img} onChange={handleChange} placeholder="VD: images/item1.jpg" />
            </div>
            <div className="form-group">
              <label>Mô tả chi tiết</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} rows="3"></textarea>
            </div>
            <div className="form-check">
                <input type="checkbox" name="soldout" checked={formData.soldout} onChange={handleChange} id="soldout" />
                <label htmlFor="soldout">Hết hàng (Sold Out)</label>
            </div>
            
            <div className="form-btns">
              <button type="submit" className="btn-save">
                {editingProduct ? 'CẬP NHẬT' : 'TẠO MỚI'}
              </button>
              {editingProduct && (
                <button type="button" className="btn-cancel" onClick={() => {
                   setEditingProduct(null);
                   setFormData({ name: '', price: 0, cat: 'tee', variant: '', desc: '', img: '', soldout: false });
                }}>HỦY BỎ</button>
              )}
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="admin-list-card">
          <h3>DANH SÁCH ({products.length})</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ẢNH</th>
                  <th>TÊN / LOẠI</th>
                  <th>GIÁ</th>
                  <th>S.OUT</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {displayProducts.map(p => (
                  <tr key={p.id}>
                    <td className="td-img"><img src={'/' + p.img} alt="" /></td>
                    <td>
                      <div className="td-name">{p.name}</div>
                      <div className="td-cat">{p.cat} - {p.variant}</div>
                    </td>
                    <td>{p.price.toLocaleString()}đ</td>
                    <td>{p.soldout ? '🔴' : '🟢'}</td>
                    <td className="td-actions">
                      <button onClick={() => handleEdit(p)} title="Sửa">✎</button>
                      <button onClick={() => handleDelete(p.id)} title="Xóa" className="btn-del">×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
