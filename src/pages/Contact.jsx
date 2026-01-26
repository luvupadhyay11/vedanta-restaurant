import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ContactPage() {
  const address = "209-B/III, S.S. Rathi Complex, BGN Market, Munirka, New Delhi - 110067"
  
  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(address)
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    window.open(googleMapsUrl, '_blank')
  }

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .contact-page {
          min-height: 100vh;
          padding: 120px 20px 80px;
          background: #f9f9f9;
        }
        
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .contact-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .contact-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          color: #1a1a1a;
          margin-bottom: 12px;
        }
        
        .contact-header p {
          font-size: 18px;
          color: #666;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-bottom: 60px;
        }
        
        .contact-card {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .contact-card h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #1a1a1a;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 20px;
          font-size: 16px;
          color: #555;
          line-height: 1.6;
        }
        
        .contact-item svg {
          color: #e67e22;
          flex-shrink: 0;
          margin-top: 2px;
        }
        
        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .hours-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .map-btn {
          background: #e67e22;
          color: white;
          border: none;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
        }
        
        .map-btn:hover {
          background: #d67019;
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .contact-page {
            padding: 100px 20px 60px;
          }
          
          .contact-header h1 {
            font-size: 36px;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .contact-card {
            padding: 30px;
          }
        }
      `}</style>
      
      <Navbar cartCount={0} openCart={() => {}} />
      
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Get in touch with Vedanta Restaurant</p>
          </div>
          
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-card">
              <h2>
                <MapPin size={28} />
                Contact Information
              </h2>
              
              <div className="contact-item">
                <MapPin size={20} />
                <span>{address}</span>
              </div>
              
              <div className="contact-item">
                <Phone size={20} />
                <span>+91 11 1234567</span>
              </div>
              
              <div className="contact-item">
                <Mail size={20} />
                <span>booking@vedanta.com</span>
              </div>
              
              <button className="map-btn" onClick={openGoogleMaps}>
                Get Directions
              </button>
            </div>
            
            {/* Opening Hours */}
            <div className="contact-card">
              <h2>
                <Clock size={28} />
                Opening Hours
              </h2>
              
              <div className="hours-list">
                <div className="hours-row">
                  <span style={{ fontWeight: '600' }}>Monday - Friday</span>
                  <span>11:00 AM - 11:00 PM</span>
                </div>
                <div className="hours-row">
                  <span style={{ fontWeight: '600' }}>Saturday</span>
                  <span>11:00 AM - 11:30 PM</span>
                </div>
                <div className="hours-row">
                  <span style={{ fontWeight: '600' }}>Sunday</span>
                  <span>11:00 AM - 11:30 PM</span>
                </div>
                <div className="hours-row" style={{ borderBottom: 'none', color: '#e67e22', marginTop: '10px' }}>
                  <span style={{ fontWeight: '600' }}>Happy Hour</span>
                  <span>5:00 PM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="contact-card">
            <h2>Have Questions?</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              We're here to help! Whether you want to make a reservation, inquire about our menu, 
              or have any other questions, feel free to reach out to us. You can call us during 
              business hours or send us an email anytime. We look forward to serving you at 
              Vedanta Restaurant!
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}