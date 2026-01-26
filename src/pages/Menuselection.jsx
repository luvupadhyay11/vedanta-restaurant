import { useState, useEffect } from 'react'
import { ArrowLeft, Search, ToggleLeft, RefreshCw, Edit2, Check, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function MenuSelection() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [user, setUser] = useState(null)
  const [editingPrice, setEditingPrice] = useState(null)
  const [newPrice, setNewPrice] = useState('')
  const [editingName, setEditingName] = useState(null)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    checkAuth()
    fetchMenuItems()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/adminlogin'
    } else {
      setUser(user)
    }
  }

  const fetchMenuItems = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })

      if (error) throw error
      setMenuItems(data || [])
    } catch (error) {
      console.error('Error fetching menu items:', error)
      alert('Failed to load menu items')
    } finally {
      setLoading(false)
    }
  }

  const toggleAvailability = async (itemId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ available: !currentStatus })
        .eq('id', itemId)

      if (error) throw error

      // Update local state
      setMenuItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, available: !currentStatus } : item
        )
      )

      alert(`Item ${!currentStatus ? 'enabled' : 'disabled'} successfully!`)
    } catch (error) {
      console.error('Error updating availability:', error)
      alert('Failed to update item availability')
    }
  }

  const handleEditPrice = (itemId, currentPrice) => {
    setEditingPrice(itemId)
    setNewPrice(currentPrice.toString())
  }

  const handleCancelEdit = () => {
    setEditingPrice(null)
    setNewPrice('')
    setEditingName(null)
    setNewName('')
  }

  const handleSavePrice = async (itemId) => {
    const priceValue = parseFloat(newPrice)
    
    if (isNaN(priceValue) || priceValue <= 0) {
      alert('Please enter a valid price')
      return
    }

    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ price: priceValue })
        .eq('id', itemId)

      if (error) throw error

      // Update local state
      setMenuItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, price: priceValue } : item
        )
      )

      setEditingPrice(null)
      setNewPrice('')
      alert('Price updated successfully!')
    } catch (error) {
      console.error('Error updating price:', error)
      alert('Failed to update price')
    }
  }

  const handleEditName = (itemId, currentName) => {
    setEditingName(itemId)
    setNewName(currentName)
  }

  const handleSaveName = async (itemId) => {
    if (!newName.trim()) {
      alert('Please enter a valid name')
      return
    }

    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ name: newName.trim() })
        .eq('id', itemId)

      if (error) throw error

      // Update local state
      setMenuItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, name: newName.trim() } : item
        )
      )

      setEditingName(null)
      setNewName('')
      alert('Name updated successfully!')
    } catch (error) {
      console.error('Error updating name:', error)
      alert('Failed to update name')
    }
  }

  const handleBackToDashboard = () => {
    window.location.href = '/admindashboard'
  }

  // Get unique categories
  const categories = ['all', ...new Set(menuItems.map(item => item.category))]

  // Filter menu items
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const stats = {
    total: menuItems.length,
    available: menuItems.filter(item => item.available).length,
    unavailable: menuItems.filter(item => !item.available).length
  }

  return (
    <>
      <div className="menu-selection-container">
        {/* Header */}
        <header className="page-header">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <div className="header-title">
              <h1>Menu Selection</h1>
              <p>Manage item availability</p>
            </div>
          </div>
          <div className="header-right">
            <span className="user-email">{user?.email}</span>
          </div>
        </header>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-box">
            <h3>{stats.total}</h3>
            <p>Total Items</p>
          </div>
          <div className="stat-box available">
            <h3>{stats.available}</h3>
            <p>Available</p>
          </div>
          <div className="stat-box unavailable">
            <h3>{stats.unavailable}</h3>
            <p>Unavailable</p>
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${categoryFilter === category ? 'active' : ''}`}
                onClick={() => setCategoryFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="refresh-btn" onClick={fetchMenuItems}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Menu Items Grid */}
        <div className="menu-section">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading menu items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="empty-state">
              <p>No menu items found</p>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map((item) => (
                <div key={item.id} className={`menu-card ${!item.available ? 'disabled' : ''}`}>
                  <div className="item-details">
                    <div className="item-header">
                      <div className="name-section">
                        {editingName === item.id ? (
                          <div className="name-edit-group">
                            <input
                              type="text"
                              className="name-input"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="Enter dish name"
                            />
                            <button 
                              className="save-name-btn"
                              onClick={() => handleSaveName(item.id)}
                              title="Save"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              className="cancel-name-btn"
                              onClick={handleCancelEdit}
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="name-display-group">
                            <h3>{item.name}</h3>
                            <button 
                              className="edit-name-btn"
                              onClick={() => handleEditName(item.id, item.name)}
                              title="Edit Name"
                            >
                              <Edit2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="price-section">
                        {editingPrice === item.id ? (
                          <div className="price-edit-group">
                            <input
                              type="number"
                              className="price-input"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              placeholder="Enter price"
                              min="0"
                              step="0.01"
                            />
                            <button 
                              className="save-price-btn"
                              onClick={() => handleSavePrice(item.id)}
                              title="Save"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              className="cancel-price-btn"
                              onClick={handleCancelEdit}
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="price-display-group">
                            <span className="item-price">₹{item.price}</span>
                            <button 
                              className="edit-price-btn"
                              onClick={() => handleEditPrice(item.id, item.price)}
                              title="Edit Price"
                            >
                              <Edit2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      {!item.available && (
                        <span className="unavailable-badge">Unavailable</span>
                      )}
                    </div>

                    <p className="item-description">{item.description}</p>

                    <div className="item-footer">
                      <span className="item-category">{item.category}</span>
                      
                      <button
                        className={`toggle-btn ${item.available ? 'enabled' : 'disabled'}`}
                        onClick={() => toggleAvailability(item.id, item.available)}
                      >
                        <ToggleLeft size={18} />
                        {item.available ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .menu-selection-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding: 20px;
        }

        .page-header {
          background: #6b7280;
          padding: 24px 32px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 10px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: white;
        }

        .header-title h1 {
          color: white;
          font-size: 28px;
          margin-bottom: 4px;
        }

        .header-title p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
        }

        .header-right .user-email {
          color: white;
          font-size: 14px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-box {
          background: white;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .stat-box h3 {
          font-size: 36px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .stat-box p {
          font-size: 14px;
          color: #666;
          font-weight: 600;
        }

        .stat-box.available h3 {
          color: #43e97b;
        }

        .stat-box.unavailable h3 {
          color: #f5576c;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .category-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .category-btn {
          padding: 10px 20px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          text-transform: capitalize;
        }

        .category-btn:hover {
          border-color: #ffb703;
          color: #fb8500;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #ffb703 0%, #fb8500 100%);
          color: #000;
          border-color: #ffb703;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 10px 16px;
          border-radius: 8px;
          border: 2px solid #e0e0e0;
          min-width: 300px;
        }

        .search-box input {
          border: none;
          outline: none;
          flex: 1;
          font-size: 14px;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          border-color: #6b7280;
          background: #f5f5f5;
        }

        .menu-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #ffb703;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .menu-card {
          border: 2px solid #f0f0f0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          background: white;
        }

        .menu-card:hover {
          border-color: #ffb703;
          box-shadow: 0 4px 16px rgba(255, 183, 3, 0.2);
          transform: translateY(-4px);
        }

        .menu-card.disabled {
          opacity: 0.6;
          background: #f9f9f9;
        }

        .item-details {
          padding: 24px;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .unavailable-badge {
          background: #f5576c;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .item-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .name-section {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .name-display-group {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .name-display-group h3 {
          margin: 0;
        }

        .edit-name-btn {
          background: transparent;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .edit-name-btn:hover {
          background: #f5f5f5;
          color: #ffb703;
        }

        .name-edit-group {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
        }

        .name-input {
          flex: 1;
          padding: 6px 10px;
          border: 2px solid #ffb703;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          outline: none;
        }

        .name-input:focus {
          border-color: #fb8500;
        }

        .save-name-btn,
        .cancel-name-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .save-name-btn {
          color: #43e97b;
        }

        .save-name-btn:hover {
          background: #43e97b;
          color: white;
        }

        .cancel-name-btn {
          color: #f5576c;
        }

        .cancel-name-btn:hover {
          background: #f5576c;
          color: white;
        }

        .price-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price-display-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .item-price {
          font-size: 18px;
          font-weight: 700;
          color: #fb8500;
        }

        .edit-price-btn {
          background: transparent;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .edit-price-btn:hover {
          background: #f5f5f5;
          color: #fb8500;
        }

        .price-edit-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .price-input {
          width: 100px;
          padding: 6px 10px;
          border: 2px solid #ffb703;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          outline: none;
        }

        .price-input:focus {
          border-color: #fb8500;
        }

        .save-price-btn,
        .cancel-price-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-price-btn {
          color: #43e97b;
        }

        .save-price-btn:hover {
          background: #43e97b;
          color: white;
        }

        .cancel-price-btn {
          color: #f5576c;
        }

        .cancel-price-btn:hover {
          background: #f5576c;
          color: white;
        }

        .item-description {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 16px;
          min-height: 42px;
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }

        .item-category {
          background: #f5f5f5;
          color: #666;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .toggle-btn.enabled {
          background: #f5576c;
          color: white;
        }

        .toggle-btn.enabled:hover {
          background: #e74c3c;
          transform: translateY(-2px);
        }

        .toggle-btn.disabled {
          background: #43e97b;
          color: white;
        }

        .toggle-btn.disabled:hover {
          background: #2ed167;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          .stats-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 16px;
          }

          .header-left {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          }

          .controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            min-width: 100%;
          }

          .category-filters {
            width: 100%;
            overflow-x: auto;
          }
        }
      `}</style>
    </>
  )
}