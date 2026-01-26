import { useState, useEffect } from 'react'
import { ArrowLeft, PlusCircle, Save, X, Utensils, IndianRupee, Tag, AlignLeft, ToggleRight, ToggleLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function AddNewDish() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/admin/login'
    } else {
      setUser(user)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleAvailability = () => {
    setFormData(prev => ({
      ...prev,
      available: !prev.available
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase
        .from('menu_items')
        .insert([
          {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: parseFloat(formData.price),
            category: formData.category.toLowerCase().trim(),
            available: formData.available
          }
        ])

      if (error) throw error

      alert('New dish added successfully!')
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        available: true
      })
      
    } catch (error) {
      console.error('Error adding dish:', error)
      alert('Failed to add dish: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToDashboard = () => {
    window.location.href = '/admin/dashboard'
  }

  return (
    <>
      <div className="add-dish-container">
        {/* Header - Mirroring MenuSelection Style */}
        <header className="page-header">
          <div className="header-left">
            <button className="back-btn" onClick={handleBackToDashboard}>
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <div className="header-title">
              <h1>Add New Dish</h1>
              <p>Expand your restaurant menu</p>
            </div>
          </div>
          <div className="header-right">
            <span className="user-email">{user?.email}</span>
          </div>
        </header>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            {/* Dish Name */}
            <div className="form-group">
              <label><Utensils size={18} /> Dish Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Paneer Butter Masala"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Price and Category Row */}
            <div className="form-row">
              <div className="form-group">
                <label><IndianRupee size={18} /> Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label><Tag size={18} /> Category *</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Main Course"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label><AlignLeft size={18} /> Description</label>
              <textarea
                name="description"
                placeholder="Describe the ingredients, taste, or portion size..."
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
              ></textarea>
            </div>

            {/* Availability Toggle */}
            <div className="availability-section">
              <div className="toggle-info">
                <span className="toggle-label">Initial Availability</span>
                <p>Should this item be visible to customers immediately?</p>
              </div>
              <button 
                type="button"
                className={`toggle-control ${formData.available ? 'is-available' : 'is-unavailable'}`}
                onClick={toggleAvailability}
              >
                {formData.available ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                <span>{formData.available ? 'Available' : 'Unavailable'}</span>
              </button>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={handleBackToDashboard}
              >
                <X size={20} /> Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-small"></div>
                ) : (
                  <><Save size={20} /> Save Dish</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .add-dish-container {
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

        .header-title h1 { color: white; font-size: 28px; margin-bottom: 4px; }
        .header-title p { color: rgba(255, 255, 255, 0.9); font-size: 14px; }
        .header-right .user-email { color: white; font-size: 14px; }

        .form-card {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .form-group {
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        input, textarea {
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          outline: none;
        }

        input:focus, textarea:focus {
          border-color: #ffb703;
          box-shadow: 0 0 0 4px rgba(255, 183, 3, 0.1);
        }

        .availability-section {
          background: #f9fafb;
          padding: 20px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          border: 1px solid #e5e7eb;
        }

        .toggle-info p {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        .toggle-label { font-weight: 700; color: #1f2937; }

        .toggle-control {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 700;
          transition: color 0.3s;
        }

        .is-available { color: #10b981; }
        .is-unavailable { color: #ef4444; }

        .form-actions {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
          padding-top: 24px;
          border-top: 1px solid #f3f4f6;
        }

        .submit-btn {
          background: linear-gradient(135deg, #ffb703 0%, #fb8500 100%);
          color: white;
          padding: 12px 32px;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(251, 133, 0, 0.3);
        }

        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .cancel-btn {
          background: #f3f4f6;
          color: #4b5563;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .spinner-small {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
          .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>
    </>
  )
}