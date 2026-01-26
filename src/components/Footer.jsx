import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = () => {
    if (agreed && email) {
      alert('Thank you for subscribing!')
      setEmail('')
      setAgreed(false)
    }
  }

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Company Info */}
          <div className="footer-column">
            <h2 className="footer-logo">Vedanta Restaurant</h2>
            <p className="footer-description">
              Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.516 2.135-4.516 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="footer-column">
            <h3 className="footer-heading">WORKING HOURS</h3>
            <div className="hours-list">
              <div className="hours-row">
                <span>Monday - Friday</span>
                <span>09:00 - 22:00</span>
              </div>
              <div className="hours-row">
                <span>Saturday</span>
                <span>11:00 - 00:00</span>
              </div>
              <div className="hours-row">
                <span>Sunday</span>
                <span>11:00 - 23:00</span>
              </div>
              <div className="hours-row happy-hour">
                <span>* Happy hour</span>
                <span>17:00 - 21:00</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="footer-column">
            <h3 className="footer-heading">OUR ADDRESS</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={20} />
                <span>209-B/III, S.S. Rathi Complex, BGN Market, New Delhi - 110067</span>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <span>9899312218, 9953003418, 9821854418</span>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <span>booking@vedanta.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h3 className="footer-heading">NEWSLETTER</h3>
            <p className="newsletter-text">Receive the latest news from us.</p>
            <div className="newsletter-form">
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubmit} className="submit-btn" aria-label="Subscribe">
                  →
                </button>
              </div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>I agree to the Privacy Policy</span>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© Copyright Vedanta Restaurant - HackGrow X</p>
          <div className="footer-links">
            <a href="#">PRIVACY</a>
            <a href="#">TERM OF USE</a>
            <a href="#">POLICY</a>
          </div>
        </div>
      </footer>

      <style>{`
        .footer {
          background: #1a1a1a;
          color: #ffffff;
          padding: 80px 0 0;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px 60px;
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
          gap: 60px;
        }

        /* Footer Column */
        .footer-column {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .footer-description {
          font-size: 15px;
          line-height: 1.8;
          color: #b0b0b0;
          margin-bottom: 30px;
        }

        .footer-heading {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ffffff;
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        /* Social Icons */
        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #ffffff;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-icon:hover {
          background: #ffb703;
          color: #000;
          transform: translateY(-3px);
        }

        /* Working Hours */
        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          color: #b0b0b0;
          padding: 8px 0;
        }

        .hours-row.happy-hour {
          color: #ffb703;
          margin-top: 8px;
        }

        /* Contact Info */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          color: #b0b0b0;
          line-height: 1.6;
        }

        .contact-item svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Newsletter */
        .newsletter-text {
          font-size: 15px;
          color: #b0b0b0;
          margin-bottom: 20px;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px 40px 12px 0;
          color: #ffffff;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .input-wrapper input::placeholder {
          color: #666;
        }

        .input-wrapper input:focus {
          border-bottom-color: #ffb703;
        }

        .submit-btn {
          position: absolute;
          right: 0;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          transition: color 0.3s ease;
        }

        .submit-btn:hover {
          color: #ffb703;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #b0b0b0;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: #ffb703;
        }

        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 30px 40px;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #666;
        }

        .footer-links {
          display: flex;
          gap: 30px;
        }

        .footer-links a {
          color: #666;
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 1px;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #ffb703;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 60px 0 0;
          }

          .footer-container {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 0 30px 40px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
            padding: 25px 30px;
          }

          .footer-links {
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 0 20px 30px;
          }

          .footer-logo {
            font-size: 28px;
          }

          .footer-heading {
            font-size: 14px;
          }

          .footer-bottom {
            padding: 20px;
          }

          .footer-bottom p {
            font-size: 12px;
          }

          .footer-links {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </>
  )
}