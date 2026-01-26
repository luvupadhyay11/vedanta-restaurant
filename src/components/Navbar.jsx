import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

export default function Navbar({ cartCount = 0, openCart, isHomePage = false }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    // Only add scroll listener on home page
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage])

  const navigateTo = (path) => {
    window.location.href = path
  }

  return (
    <>
      <nav className={`navbar ${!isHomePage ? 'non-home' : scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to='/' className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">Vedanta Restaurant</span>
          </Link>

          {/* Navigation Links */}
          <div className="nav-links">
            <button className="nav-link" onClick={() => navigateTo('/')}>
              Home
            </button>
            <button className="nav-link" onClick={() => navigateTo('/about')}>
              About
            </button>
            <button className="nav-link" onClick={() => navigateTo('/menu')}>
              Menu
            </button>
            <button className="nav-link" onClick={() => navigateTo('/contact')}>
              Contact
            </button>
          </div>

          {/* Action Buttons */}
          <div className="nav-actions">
            {/* Cart Button */}
            <button className="cart-btn" onClick={openCart} aria-label="Shopping Cart">
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* Login Button */}
            <button className="login-btn" onClick={() => navigateTo('/AdminLogin')}>
              Login
            </button>

            {/* Order Now Button */}
            <button className="order-btn" onClick={() => navigateTo('/menu')}>
              Order Now
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.4s ease;
          padding: 20px 0;
          background: transparent;
          font-family: 'Poppins', sans-serif;
        }

        .navbar.scrolled {
          background: #6b7280;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 12px 0;
        }

        .navbar.non-home {
          background: #6b7280;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 12px 0;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 40px;
        }

        /* Logo Styles */
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .logo-icon {
          font-size: 32px;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: white;
        }

        /* Navigation Links */
        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-link {
          background: none;
          border: none;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 0;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffb703;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #ffb703;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Action Buttons */
        .nav-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        /* Cart Button */
        .cart-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .cart-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ff4757;
          color: white;
          border-radius: 100%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid white;
        }

        /* Login Button */
        .login-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          padding: 8px 12px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        /* Order Now Button */
        .order-btn {
          background: linear-gradient(135deg, #ffb703 0%, #fb8500 100%);
          color: #000;
          border: none;
          padding: 8px 12px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 183, 3, 0.4);
        }

        .order-btn:hover {
          box-shadow: 0 6px 25px rgba(255, 183, 3, 0.6);
          background: linear-gradient(135deg, #fb8500 0%, #ffb703 100%);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .navbar-container {
            padding: 0 30px;
          }

          .nav-links {
            gap: 24px;
          }

          .nav-link {
            font-size: 15px;
          }
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 20px;
          }

          .logo-text {
            font-size: 18px;
          }

          .logo-icon {
            font-size: 28px;
          }

          .nav-links {
            display: none;
          }

          .login-btn {
            padding: 8px 16px;
            font-size: 14px;
          }

          .cart-btn {
            width: 42px;
            height: 42px;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 0 16px;
          }

          .login-btn {
            display: none;
          }
        }
      `}</style>
    </>
  )
}