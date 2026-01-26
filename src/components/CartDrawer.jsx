import { useState } from 'react'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import OrderFormModal from './OrderFormModal'

export default function CartDrawer({ cart, isOpen, onClose, updateQty, removeFromCart, clearCart, cartTotal }) {
  const [showOrderForm, setShowOrderForm] = useState(false)

  const handleProceedToOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }
    setShowOrderForm(true)
  }

  const handleCloseOrderForm = () => {
    setShowOrderForm(false)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      {/* Cart Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={64} color="#ccc" />
              <p>Your cart is empty</p>
              <span>Add items to get started</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="item-price">₹{item.price} × {item.qty}</p>
                    </div>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => updateQty(item.id, -1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-display">{item.qty}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateQty(item.id, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="item-total">₹{item.price * item.qty}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="subtotal-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="total-row">
                  <span>Total Amount</span>
                  <span className="total-amount">₹{cartTotal}</span>
                </div>
                
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                
                <button className="proceed-btn" onClick={handleProceedToOrder}>
                    Proceed to Order
                  <ArrowRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Form Modal */}
      <OrderFormModal 
        isOpen={showOrderForm}
        onClose={handleCloseOrderForm}
        cart={cart}
        cartTotal={cartTotal}
      />

      <style>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: -450px;
          width: 450px;
          height: 100%;
          background: white;
          z-index: 2000;
          box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
          transition: right 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
        }

        .cart-drawer.open {
          right: 0;
        }

        .cart-header {
          padding: 24px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #6b7280;
          color: white;
        }

        .cart-header h3 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.2);
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
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .cart-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .empty-cart {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 40px;
          text-align: center;
        }

        .empty-cart p {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .empty-cart span {
          font-size: 14px;
          color: #999;
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .item-info {
          flex: 1;
        }

        .item-info h4 {
          margin: 0 0 6px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .item-price {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f5f5f5;
          padding: 6px 10px;
          border-radius: 20px;
        }

        .qty-btn {
          background: #1a1a1a;
          color: white;
          border: none;
          width: 24px;
          height: 24px;
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

        .qty-display {
          font-size: 14px;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }

        .item-total {
          font-size: 16px;
          font-weight: 700;
          color: #fb8500;
        }

        .cart-footer {
          padding: 20px;
          border-top: 2px solid #e0e0e0;
          background: #f9f9f9;
        }

        .subtotal-row,
        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 15px;
        }

        .total-row {
          font-size: 18px;
          font-weight: 700;
          padding-top: 12px;
          border-top: 1px solid #e0e0e0;
          margin-bottom: 20px;
        }

        .total-amount {
          color: #fb8500;
          font-size: 22px;
        }

        .clear-cart-btn {
          width: 100%;
          background: transparent;
          color: #6b7280;
          border: 2px solid #6b7280;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }

        .clear-cart-btn:hover {
          background: #6b7280;
          color: white;
        }

        .proceed-btn {
          width: 100%;
          background: linear-gradient(135deg, #ffb703 0%, #fb8500 100%);
          color: #000;
          border: none;
          padding: 16px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 183, 3, 0.3);
        }

        .proceed-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(255, 183, 3, 0.5);
        }

        .proceed-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 480px) {
          .cart-drawer {
            width: 100%;
            right: -100%;
          }

          .cart-header {
            padding: 20px;
          }

          .cart-header h3 {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  )
}