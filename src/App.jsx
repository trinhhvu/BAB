import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LOCAL_PRODUCTS from './data/products'
import { productService } from './services/productService'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Menu from './components/Menu'
import LoadingScreen from './components/LoadingScreen'

// Pages
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Lookbook from './pages/Lookbook'
import PopupEvents from './pages/PopupEvents'
import About from './pages/About'
import Admin from './pages/Admin'

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState('')

  async function loadProducts() {
    setIsLoading(true)
    const minimumDelay = new Promise(resolve => setTimeout(resolve, 1000));
    try {
      const [data] = await Promise.all([
        productService.getAllProducts(),
        minimumDelay
      ]);

      if (data && data.length > 0) {
        setProducts(data)
      } else {
        setProducts(LOCAL_PRODUCTS)
      }
    } catch (err) {
      console.error("Error loading products:", err)
      setProducts(LOCAL_PRODUCTS)
    }
    setIsLoading(false)
  }

  // Fetch products from Backend (Supabase)
  useEffect(() => {
    loadProducts()
  }, [])

  // Revert: Group ALL products by name for the Home page grid
  const displayedProducts = (() => {
    if (!Array.isArray(products)) return []
    const groups = {}
    products.forEach(p => {
      if (p && p.name) {
        if (!groups[p.name]) {
          groups[p.name] = { ...p, variants: [p] }
        } else {
          groups[p.name].variants.push(p)
        }
      }
    })
    return Object.values(groups)
  })()

  // Toggle helpers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  // Cart logic
  const addToCart = (product) => {
    setCart([...cart, product])
    showToast(`ĐÃ THÊM: ${product.name}`)
  }

  const removeFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  // Toast logic
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <Router>
      {isLoading && <LoadingScreen />}
      <div className="app">
        {/* Persistent Components */}
        <Header 
          cartCount={cart.length} 
          onToggleMenu={toggleMenu} 
          onToggleCart={toggleCart} 
        />

        <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={toggleCart} 
          cartItems={cart} 
          onRemove={removeFromCart} 
          total={cartTotal} 
        />


        {/* ── TOAST ── */}
        <div id="toast" className={toast ? 'show' : ''}>
          {toast}
        </div>

        {/* ── ROUTING ── */}
        <Routes>
          <Route path="/" element={
            <Home 
              products={displayedProducts} 
              onAddToCart={addToCart} 
            />
          } />
          <Route path="/product/:slug" element={
            <ProductDetail 
              products={displayedProducts} 
              onAddToCart={addToCart} 
            />
          } />
          <Route path="/lookbook" element={<Lookbook products={products} />} />
          <Route path="/popup" element={<PopupEvents />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin onRefresh={loadProducts} allProducts={products} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
