import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import { Plus, Minus } from 'lucide-react'

export default function MenuPage() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    fetchDishes()
    // Load cart from localStorage
    const savedCart = localStorage.getItem('restaurantCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('restaurantCart', JSON.stringify(cart))
  }, [cart])

  async function fetchDishes() {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)  // Only fetch items where available is true
        .order('category', { ascending: true })
        .order('name', { ascending: true })
      
      if (error) throw error
      setDishes(data || [])
    } catch (error) {
      console.error('Error fetching dishes:', error.message)
    } finally {
      setLoading(false)
    }
  }

  function addToCart(item) {
    setCart(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) {
        return prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
    setIsCartOpen(true)
  }

  function updateQty(id, change) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty + change }
            : item
        )
        .filter(item => item.qty > 0)
    )
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)

  // Group dishes by category
  const uniqueCategories = [...new Set(dishes.map(item => item.category))].filter(Boolean)
  const groupedDishes = uniqueCategories.map(category => ({
    category,
    items: dishes.filter(item => item.category === category)
  }))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');
        
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .menu-page-wrapper { 
          background: #fff; 
          min-height: 100vh; 
          padding-top: 80px; 
        }
        
        .menu-container { 
          max-width: 1100px; 
          margin: 0 auto; 
          padding: 60px 20px; 
        }
        
        .menu-header { 
          text-align: center; 
          margin-bottom: 60px; 
        }
        
        .orange-line { 
          width: 50px; 
          height: 2px; 
          background: #e67e22; 
          margin: 0 auto 10px; 
        }
        
        .subtitle { 
          color: #e67e22; 
          letter-spacing: 2px; 
          font-weight: 600; 
          font-size: 14px; 
          text-transform: uppercase;
        }
        
        .menu-title { 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 42px; 
          margin-top: 5px; 
          color: #1a1a1a;
        }
        
        .category-section { 
          margin-bottom: 60px; 
        }
        
        .category-title { 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 32px; 
          text-align: center; 
          margin-bottom: 30px;
          color: #1a1a1a;
          font-weight: 600;
        }
        
        .category-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0 auto 30px;
        }
        
        .menu-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 40px 80px; 
        }
        
        .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #f2f2f2;
          padding-bottom: 20px;
        }
        
        .item-content { 
          flex: 1; 
        }
        
        .item-header { 
          display: flex; 
          align-items: baseline; 
        }
        
        .item-name { 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 22px; 
          font-weight: 600; 
          color: #1a1a1a;
        }
        
        .item-dots { 
          flex: 1; 
          border-bottom: 1px dotted #ccc; 
          margin: 0 10px; 
        }
        
        .item-price { 
          font-family: 'Poppins', sans-serif; 
          font-size: 18px; 
          color: #1a1a1a; 
          font-weight: 600;
        }
        
        .item-description { 
          color: #888; 
          font-size: 13px; 
          margin-top: 5px; 
          line-height: 1.6;
        }
        
        .item-action {
          margin-left: 20px;
        }
        
        .add-button-small {
          background: white;
          border: 1px solid #e67e22;
          color: #e67e22;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
        }
        
        .add-button-small:hover {
          background: #e67e22;
          color: white;
          transform: translateY(-2px);
        }
        
        .qty-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #e67e22;
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .qty-pill button { 
          background: none; 
          border: none; 
          color: white; 
          cursor: pointer; 
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }
        
        .qty-pill button:hover {
          transform: scale(1.2);
        }
        
        .loading { 
          text-align: center; 
          padding: 100px 20px; 
          font-size: 18px; 
          color: #666; 
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 850px) {
          .menu-grid { 
            grid-template-columns: 1fr; 
            gap: 30px;
          }
          
          .menu-container {
            padding: 40px 20px;
          }
          
          .menu-title {
            font-size: 36px;
          }
          
          .category-title {
            font-size: 28px;
          }
        }

        @media (max-width: 600px) {
          .menu-page-wrapper {
            padding-top: 70px;
          }
          
          .menu-container {
            padding: 30px 16px;
          }
          
          .menu-title {
            font-size: 32px;
          }
        }
      `}</style>
      
      <Navbar 
        cartCount={cartCount} 
        openCart={() => setIsCartOpen(true)} 
      />
      
      <div className="menu-page-wrapper">
        <main className="menu-container">
          <div className="menu-header">
            <div className="orange-line"></div>
            <span className="subtitle">FRESH & TASTY</span>
            <h1 className="menu-title">OUR SPECIAL MENU</h1>
          </div>
          
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading deliciousness...</p>
            </div>
          ) : (
            groupedDishes.map(({ category, items }) => (
              <div key={category} className="category-section">
                <h2 className="category-title">{category}</h2>
                <div className="category-divider"></div>
                <div className="menu-grid">
                  {items.map((dish) => {
                    const cartItem = cart.find(i => i.id === dish.id)
                    const quantity = cartItem ? cartItem.qty : 0

                    return (
                      <div key={dish.id} className="menu-item">
                        <div className="item-content">
                          <div className="item-header">
                            <span className="item-name">{dish.name}</span>
                            <div className="item-dots"></div>
                            <span className="item-price">₹{dish.price}</span>
                          </div>
                          {dish.description && (
                            <p className="item-description">{dish.description}</p>
                          )}
                        </div>
                        
                        <div className="item-action">
                          {quantity > 0 ? (
                            <div className="qty-pill">
                              <button onClick={() => updateQty(dish.id, -1)}>
                                <Minus size={12} />
                              </button>
                              <span>{quantity}</span>
                              <button onClick={() => updateQty(dish.id, 1)}>
                                <Plus size={12} />
                              </button>
                            </div>
                          ) : (
                            <button className="add-button-small" onClick={() => addToCart(dish)}>
                              <Plus size={14} /> ADD
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      <Footer />
      
      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        cartTotal={cartTotal}
      />
    </>
  )
}