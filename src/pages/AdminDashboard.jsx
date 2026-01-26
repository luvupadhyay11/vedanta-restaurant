import { useState, useEffect } from 'react'
import { LogOut, Package, Clock, CheckCircle, XCircle, RefreshCw, Search, UtensilsCrossed } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkAuth()
    fetchOrders()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/admin/login'
    } else {
      setUser(user)
    }
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      alert('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error
      
      // Refresh orders
      fetchOrders()
      alert('Order status updated successfully!')
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order status')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/adminlogin'
  }

  const handleMenuSelection = () => {
    window.location.href = '/MenuSelection'
  }
    const handleAddNewDish = () => {
    window.location.href = '/AddNewDish'
  }

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = 
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm) ||
      order.id?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    completed: orders.filter(o => o.status === 'completed').length,
  }

  return (
    <>
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>🍽️ Admin Dashboard</h1>
            <p>Vedanta Restaurant</p>
          </div>
          <div className="header-right">
            <span className="user-email">{user?.email}</span>
            <button className="menu-selection-btn" onClick={handleAddNewDish}>
              <UtensilsCrossed size={18} />
              Add New Dish
            </button>
            <button className="menu-selection-btn" onClick={handleMenuSelection}>
              <UtensilsCrossed size={18} />
              Menu Selection
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">
              <Package size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon preparing">
              <RefreshCw size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.preparing}</h3>
              <p>Preparing</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completed">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="controls">
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All Orders
            </button>
            <button 
              className={filter === 'pending' ? 'active' : ''} 
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={filter === 'preparing' ? 'active' : ''} 
              onClick={() => setFilter('preparing')}
            >
              Preparing
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''} 
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name, phone, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="orders-section">
          <div className="section-header">
            <h2>Orders ({filteredOrders.length})</h2>
            <button className="refresh-btn" onClick={fetchOrders}>
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-state">
              <Package size={48} color="#ccc" />
              <p>No orders found</p>
            </div>
          ) : (
            <div className="orders-list">
              {filteredOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-id">
                      <strong>Order #{order.id.substring(0, 8)}</strong>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-date">
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>

                  <div className="order-body">
                    <div className="customer-info">
                      <h4>{order.customer_name}</h4>
                      <p>📞 {order.phone}</p>
                      <p>
                        {order.order_type === 'dine-in' 
                          ? `🪑 Table: ${order.table_number}` 
                          : `🏠 ${order.address}`
                        }
                      </p>
                    </div>

                    <div className="order-items">
                      <strong>Items:</strong>
                      <ul>
                        {JSON.parse(JSON.stringify(order.items)).map((item, i) => (
                          <li key={i}>
                            {item.name} × {item.qty} - ₹{item.price * item.qty}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="order-total">
                      <strong>Total: ₹{order.total_amount}</strong>
                    </div>
                  </div>

                  <div className="order-actions">
                    {order.status === 'pending' && (
                      <button 
                        className="btn-preparing"
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button 
                        className="btn-completed"
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                      >
                        Mark Complete
                      </button>
                    )}
                    {order.status !== 'cancelled' && (
                      <button 
                        className="btn-cancel"
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    )}
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

        .dashboard-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding: 20px;
        }

        .dashboard-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 32px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .header-left h1 {
          color: white;
          font-size: 28px;
          margin-bottom: 4px;
        }

        .header-left p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-email {
          color: white;
          font-size: 14px;
        }

        .menu-selection-btn {
          background: linear-gradient(135deg, #ffb703 0%, #fb8500 100%);
          color: #000;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(255, 183, 3, 0.3);
        }

        .menu-selection-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 183, 3, 0.5);
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 10px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon.total { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .stat-icon.pending { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .stat-icon.preparing { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        .stat-icon.completed { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

        .stat-info h3 {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .stat-info p {
          font-size: 14px;
          color: #666;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 20px;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
        }

        .filter-buttons button {
          padding: 10px 20px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .filter-buttons button:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .filter-buttons button.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
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

        .orders-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h2 {
          font-size: 22px;
          color: #1a1a1a;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          background: #e0e0e0;
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 48px;
          height: 48px;
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

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .order-card {
          border: 2px solid #f0f0f0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .order-card:hover {
          border-color: #667eea;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .order-id {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.pending { background: #fff3cd; color: #856404; }
        .status-badge.preparing { background: #cfe2ff; color: #084298; }
        .status-badge.completed { background: #d1e7dd; color: #0f5132; }
        .status-badge.cancelled { background: #f8d7da; color: #842029; }

        .order-date {
          font-size: 13px;
          color: #666;
        }

        .order-body {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 24px;
          margin-bottom: 16px;
        }

        .customer-info h4 {
          margin-bottom: 8px;
          color: #1a1a1a;
        }

        .customer-info p {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
        }

        .order-items ul {
          list-style: none;
          padding-left: 0;
        }

        .order-items li {
          font-size: 14px;
          color: #555;
          padding: 4px 0;
        }

        .order-total {
          text-align: right;
          font-size: 18px;
          color: #667eea;
        }

        .order-actions {
          display: flex;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }

        .order-actions button {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-preparing {
          background: #4facfe;
          color: white;
        }

        .btn-preparing:hover {
          background: #00a6ff;
        }

        .btn-completed {
          background: #43e97b;
          color: white;
        }

        .btn-completed:hover {
          background: #2ed167;
        }

        .btn-cancel {
          background: #f5576c;
          color: white;
        }

        .btn-cancel:hover {
          background: #e74c3c;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .order-body {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 16px;
          }

          .header-right {
            flex-wrap: wrap;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .controls {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-buttons {
            overflow-x: auto;
          }

          .search-box {
            min-width: 100%;
          }
        }
      `}</style>
    </>
  )
}