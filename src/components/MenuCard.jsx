import { Plus, Star } from 'lucide-react'

function MenuCard({ item, addToCart }) {
  return (
    <div className="menu-card">
      <div className="card-image-container">
        <img src={item.image_url} alt={item.name} />
        <div className="card-badge">
          <Star size={14} fill="#ffb703" color="#ffb703" />
          <span>4.5</span>
        </div>
      </div>

      <div className="card-content">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>
        
        <div className="card-footer">
          <div className="price-section">
            <span className="price">₹{item.price}</span>
            <span className="price-label">per plate</span>
          </div>
          <button 
            className="add-btn"
            onClick={() => addToCart(item)}
          >
            <Plus size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Menu({ addToCart }) {

  const dishes = [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Creamy tomato curry with tender chicken pieces",
      price: 280,
      image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
    },
    {
      id: 2,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with aromatic spices",
      price: 220,
      image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
    },
    {
      id: 3,
      name: "Biryani",
      description: "Fragrant basmati rice with spiced meat",
      price: 300,
      image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
    },
    {
      id: 4,
      name: "Dosa",
      description: "Crispy rice crepe served with chutney",
      price: 150,
      image_url: "https://images.unsplash.com/photo-1630383249896-424e482df921"
    },
    {
      id: 5,
      name: "Tandoori Roti",
      description: "Soft whole wheat bread from tandoor",
      price: 40,
      image_url: "https://images.unsplash.com/photo-1619221882784-8e939b004204"
    },
    {
      id: 6,
      name: "Dal Makhani",
      description: "Creamy black lentils slow-cooked overnight",
      price: 180,
      image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d"
    },
    {
      id: 7,
      name: "Masala Chai",
      description: "Traditional spiced tea with milk",
      price: 50,
      image_url: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f"
    },
    {
      id: 8,
      name: "Gulab Jamun",
      description: "Sweet milk dumplings in rose syrup",
      price: 80,
      image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733"
    },
    {
      id: 9,
      name: "Samosa",
      description: "Crispy pastry filled with spiced potatoes",
      price: 60,
      image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    },
    {
      id: 10,
      name: "Chicken Tikka",
      description: "Marinated grilled chicken pieces",
      price: 260,
      image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0"
    }
  ]

  return (
    <>
      <section className="menu-section">
        <div className="menu-container">
          <div className="menu-header">
            <h2>Our Menu</h2>
            <p>Discover our delicious dishes</p>
          </div>

          <div className="menu-grid">
            {dishes.map((dish) => (
              <MenuCard key={dish.id} item={dish} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .menu-section {
          padding: 60px 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .menu-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .menu-header h2 {
          font-size: 42px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .menu-header p {
          font-size: 18px;
          color: #666;
        }

        /* THIS IS THE KEY - Grid with 5 columns */
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }

        /* Menu Card Styles */
        .menu-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .menu-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .card-image-container {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
        }

        .menu-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .menu-card:hover img {
          transform: scale(1.1);
        }

        .card-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 6px 12px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .card-content {
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .menu-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #1a1a1a;
          line-height: 1.3;
        }

        .description {
          font-size: 12px;
          color: #666;
          line-height: 1.4;
          margin-bottom: 12px;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px solid #f0f0f0;
        }

        .price-section {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .price {
          font-size: 18px;
          font-weight: 800;
          color: #000;
          line-height: 1;
        }

        .price-label {
          font-size: 10px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .add-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }

        .add-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 1400px) {
          .menu-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }

          .menu-header h2 {
            font-size: 36px;
          }
        }

        @media (max-width: 768px) {
          .menu-section {
            padding: 40px 16px;
          }

          .menu-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .menu-header h2 {
            font-size: 32px;
          }

          .menu-header p {
            font-size: 16px;
          }

          .card-image-container {
            height: 140px;
          }
        }

        @media (max-width: 480px) {
          .menu-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .card-image-container {
            height: 180px;
          }
        }
      `}</style>
    </>
  )
}