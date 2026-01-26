import { useState } from "react"
import { X, Home, UtensilsCrossed, User, Phone, MapPin, Hash } from 'lucide-react'
import { supabase } from "../lib/supabase"

export default function OrderFormModal({ isOpen, onClose, cart, cartTotal }) {
  const [orderType, setOrderType] = useState("dine-in")
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [tableNumber, setTableNumber] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!customerName.trim()) {
      alert("Please enter your name")
      return
    }

    if (!phone.trim() || phone.length < 10) {
      alert("Please enter a valid phone number (10 digits)")
      return
    }

    if (orderType === "dine-in" && !tableNumber.trim()) {
      alert("Please enter table number")
      return
    }

    if (orderType === "home-delivery" && !address.trim()) {
      alert("Please enter delivery address")
      return
    }

    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }

    setLoading(true)

    try {
      const orderData = {
        customer_name: customerName,
        phone: phone,
        order_type: orderType,
        table_number: orderType === "dine-in" ? tableNumber : null,
        address: orderType === "home-delivery" ? address : null,
        items: cart,
        total_price: cartTotal,
        status: "pending"
      }

      console.log("Sending order data:", orderData)

      const { data, error } = await supabase
        .from("orders")
        .insert([orderData])
        .select()

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      console.log("Order saved successfully:", data)

      // Clear form
      setCustomerName("")
      setPhone("")
      setTableNumber("")
      setAddress("")
      
      // Clear cart from localStorage
      localStorage.removeItem('restaurantCart')
      
      alert("🎉 Order placed successfully! Order ID: " + data[0].id)
      onClose()
      
      // Reload page to clear cart
      setTimeout(() => {
        window.location.reload()
      }, 500)

    } catch (error) {
      console.error("Order error:", error)
      alert("😢 Failed to place order: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-container">
        <div className="modal-header">
          <h2>Complete Your Order</h2>
          <button className="close-btn" onClick={onClose} type="button">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-wrapper">
            {/* Order Type Selection */}
            <div className="section">
              <label className="section-label">Order Type</label>
              <div className="order-type-selector">
                <button
                  type="button"
                  className={`type-btn ${orderType === "dine-in" ? "active" : ""}`}
                  onClick={() => {
                    setOrderType("dine-in")
                    setAddress("") // Clear address when switching
                  }}
                >
                  <UtensilsCrossed size={24} />
                  <span>Dine In</span>
                </button>
                <button
                  type="button"
                  className={`type-btn ${orderType === "home-delivery" ? "active" : ""}`}
                  onClick={() => {
                    setOrderType("home-delivery")
                    setTableNumber("") // Clear table number when switching
                  }}
                >
                  <Home size={24} />
                  <span>Home Delivery</span>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="section">
              <label className="section-label">Customer Details</label>
              
              <div className="input-group">
                <User size={20} />
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <Phone size={20} />
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits) *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength="10"
                />
              </div>

              {orderType === "dine-in" && (
                <div className="input-group">
                  <Hash size={20} />
                  <input
                    type="text"
                    placeholder="Table Number *"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </div>
              )}

              {orderType === "home-delivery" && (
                <div className="input-group">
                  <MapPin size={20} />
                  <textarea
                    placeholder="Delivery Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                  />
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="section last-section">
              <label className="section-label">Order Summary</label>
              <div className="order-summary">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="summary-total">
                  <span>Total Amount</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button - Inside scrollable area */}
            <button 
              type="button"
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 2500;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 550px;
          max-height: 95vh;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 2600;
          overflow: hidden;
          animation: slideUp 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .modal-header {
          padding: 20px 24px;
          background: #1a1a1a;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .modal-body {
          padding: 20px 24px;
          padding-bottom: 24px;
          overflow-y: auto;
          flex: 1;
        }

        .form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .section {
          margin-bottom: 20px;
        }

        .section.last-section {
          margin-bottom: 24px;
        }

        .section-label {
          display: block;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .order-type-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .type-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: #f5f5f5;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: #1a1a1a;
        }

        .type-btn:hover {
          background: #ebebeb;
          border-color: #ffb703;
        }

        .type-btn.active {
          background: linear-gradient(135deg, #ffb703 0%, #fb8500 100%);
          border-color: #ffb703;
          color: #000;
        }

        .input-group {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #f9f9f9;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 12px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .input-group:focus-within {
          border-color: #ffb703;
          background: white;
        }

        .input-group svg {
          color: #666;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .input-group input,
        .input-group textarea {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 15px;
          font-family: inherit;
          resize: none;
          color: #1a1a1a;
        }

        .input-group input::placeholder,
        .input-group textarea::placeholder {
          color: #999;
        }

        .order-summary {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 16px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          color: #555;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          margin-top: 8px;
          border-top: 2px solid #e0e0e0;
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #ffb703 0%, #fb8500 100%);
          color: #000;
          border: none;
          padding: 16px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 183, 3, 0.4);
          margin-bottom: 0;
          margin: 380px auto 0;
          margin-left: 40px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(255, 183, 3, 0.6);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .modal-container {
            width: 95%;
            max-height: 95vh;
          }

          .modal-header {
            padding: 20px;
          }

          .modal-header h2 {
            font-size: 20px;
          }

          .modal-body {
            padding: 20px;
            padding-bottom: 20px;
          }

          .modal-footer {
            padding: 16px 20px;
          }

          .order-type-selector {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}