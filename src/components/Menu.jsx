import { useEffect, useState } from "react"
import { ShoppingCart, Plus, Minus } from 'lucide-react'

function MenuCard({ item, addToCart, updateQty, cartItems }) {
  const cartItem = cartItems?.find(i => i.id === item.id)
  const quantity = cartItem ? cartItem.qty : 0

  const handleAdd = () => {
    addToCart(item)
  }

  const handleDecrease = () => {
    updateQty(item.id, -1)
  }

  const handleIncrease = () => {
    updateQty(item.id, 1)
  }

  return (
    <div className="menu-card">
      <div className="card-image-container">
        <img src={item.image_url} alt={item.name} />
        {item.discount && (
          <div className="sale-badge">Sale</div>
        )}
      </div>

      <div className="card-content">
        <h3>{item.name}</h3>
        
        <div className="price-row">
          {item.original_price && (
            <span className="original-price">₹{item.original_price}</span>
          )}
          <span className="price">₹{item.price}</span>
        </div>

        {quantity > 0 ? (
          <div className="quantity-controls">
            <button 
              className="qty-btn"
              onClick={handleDecrease}
            >
              <Minus size={16} />
            </button>
            <span className="quantity">{quantity}</span>
            <button 
              className="qty-btn"
              onClick={handleIncrease}
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button 
            className="add-btn"
            onClick={handleAdd}
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default function Menu({ addToCart, updateQty, limit = 8, cart = [] }) {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDishes()
  }, [limit])

  async function fetchDishes() {
    try {
      setLoading(true)
      
      // REPLACE WITH YOUR SUPABASE INTEGRATION:
      // import { supabase } from "../lib/supabase"
      // const { data, error } = await supabase
      //   .from("menu_items")
      //   .select("*")
      //   .limit(limit)
      // if (error) throw error
      // setDishes(data || [])
      
      // Indian Restaurant Menu with Relevant Images
      const demoData = [
        {
          id: 1,
          name: "Paneer Tikka",
          price: 230,
          image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80"
        },
        {
          id: 2,
          name: "Tandoori Chicken",
          price: 290,
          image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80"
        },
        {
          id: 3,
          name: "Tawa Mutton Kabab",
          price: 350,
          original_price: 400,
          discount: true,
          image_url: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80"
        },
        {
          id: 4,
          name: "Butter Chicken (Half)",
          price: 480,
          image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80"
        },
        {
          id: 5,
          name: "Paneer Butter Masala",
          price: 310,
          image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80"
        },
        {
          id: 6,
          name: "Dal Makhni",
          price: 230,
          image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
        },
        {
          id: 7,
          name: "Kashmiri Pulao",
          price: 280,
          image_url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80"
        },
        {
          id: 8,
          name: "Butter Roti",
          price: 20,
          image_url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80"
        }
      ]
      
      setDishes(demoData.slice(0, limit))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dishes:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="menu-section" id="menu">
        <div className="menu-container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading delicious dishes...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="menu-section" id="menu">
        <div className="menu-container">
          <div className="menu-header">
            <h2>ORDER NOW</h2>
          </div>

          <div className="menu-grid">
            {dishes.map((dish) => (
              <MenuCard 
                key={dish.id} 
                item={dish} 
                addToCart={addToCart}
                updateQty={updateQty}
                cartItems={cart}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap');

        .menu-section {
          padding: 80px 20px;
          background: #f9f9f9;
        }

        .menu-container {
          max-width: 980px;
          margin: 0 auto;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 10px;
        }

        .menu-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: 4px;
          margin: 40px;
        }

        .loading {
          text-align: center;
          padding: 100px 20px;
        }

        .spinner {
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

        .loading p {
          font-size: 18px;
          color: #666;
        }

        /* 4 COLUMNS GRID (2 rows x 4 items) */
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        /* Menu Card Styles */
        .menu-card {
          background: #ffffff;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .menu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .card-image-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: #f5f5f5;
        }

        .menu-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .menu-card:hover img {
          transform: scale(1.08);
        }

        .sale-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #e67e22;
          color: white;
          padding: 8px 16px;
          border-radius: 50%;
          font-size: 14px;
          font-weight: 600;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-content {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: center;
        }

        .menu-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.3;
          margin: 0;
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .original-price {
          font-size: 16px;
          color: #999;
          text-decoration: line-through;
        }

        .price {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
        }

        /* Add Button */
        .add-btn {
          background: #000;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
        }

        .add-btn:hover {
          background: #333;
          transform: translateY(-2px);
        }

        /* Quantity Controls */
        .quantity-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 8px;
          padding: 8px;
          background: #f5f5f5;
        }

        .qty-btn {
          background: #000;
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .qty-btn:hover {
          background: #333;
          transform: scale(1.1);
        }

        .quantity {
          font-size: 18px;
          font-weight: 700;
          min-width: 30px;
          text-align: center;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .menu-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 900px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .menu-header h2 {
            font-size: 36px;
          }

          .card-image-container {
            height: 240px;
          }
        }

        @media (max-width: 600px) {
          .menu-section {
            padding: 50px 16px;
          }

          .menu-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .menu-header h2 {
            font-size: 32px;
            letter-spacing: 2px;
          }

          .card-image-container {
            height: 280px;
          }
        }
      `}</style>
    </>
  )
}