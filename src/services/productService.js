import { supabase } from '../supabaseClient'

export const productService = {
  // Lấy toàn bộ danh sách sản phẩm từ Supabase
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Lỗi lấy sản phẩm:', error)
      return []
    }
    return data
  },

  // Lấy chi tiết 1 sản phẩm (nếu cần theo slug hoặc id)
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Lỗi lấy chi tiết sản phẩm:', error)
      return null
    }
    return data
  },

  // Thêm sản phẩm mới
  async addProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    if (error) throw error
    return data[0]
  },

  // Cập nhật sản phẩm
  async updateProduct(id, updates) {
    console.log('Đang gửi cập nhật cho ID:', id, 'Dữ liệu:', updates);
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Lỗi Supabase:', error);
      throw error;
    }
    
    console.log('Kết quả từ Supabase:', data);
    
    if (!data || data.length === 0) {
      throw new Error('Không tìm thấy sản phẩm để cập nhật hoặc không có quyền.');
    }
    return data[0]
  },

  // Xóa sản phẩm
  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) throw error
    return true
  }
}
