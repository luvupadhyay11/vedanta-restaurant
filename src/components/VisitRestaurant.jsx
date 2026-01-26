import { MapPin, Phone, Mail } from 'lucide-react'

export default function VisitRestaurant() {
  const address = "209-B/III, S.S. Rathi Complex, BGN Market, Munirka, New Delhi - 110067"
  
  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(address)
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    window.open(googleMapsUrl, '_blank')
  }

  return (
    <>
      <section className="visit-section">
        <div className="visit-container">
          {/* Left Content */}
          <div className="visit-content">
            <div className="content-header">
              <div className="orange-line"></div>
              <span className="subtitle">RIGHT HERE WAITING</span>
            </div>
            
            <h2 className="main-title">
              VISIT OUR RESTAURANT
            </h2>

            <p className="v_description">
              Love to see you at Vedanta.
            </p>

            <div className="contact-details">
              <div className="detail-item">
                <MapPin size={20} />
                <span>{address}</span>
              </div>
              <div className="detail-item">
                <Mail size={20} />
                <span>M: Vedanta11@gmail.com</span>
              </div>
              <div className="detail-item">
                <Phone size={20} />
                <span>T: +91 9899312218</span>
              </div>
            </div>

            <button className="directions-btn" onClick={openGoogleMaps}>
              GET DIRECTIONS
            </button>
          </div>

          {/* Right Images */}
          <div className="visit-images">
            <div className="image-left">
              <img 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80" 
                alt="Restaurant ambiance"
              />
            </div>
            <div className="image-right">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" 
                alt="Delicious food"
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');

        .visit-section {
          padding: 0 10px; /* Reduced from 5px to 0 */
          background: #ffffff;
        }

        .visit-container {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .visit-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .orange-line {
          width: 60px;
          height: 2px;
          background: #e67e22;
        }

        .subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #e67e22;
          text-transform: uppercase;
        }

        .main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          color: #1a1a1a;
          margin: 0;
        }

        .v_description {
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          line-height: 1.8;
          color: #666;
          margin: 0;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          color: #333;
          line-height: 1.6;
        }

        .detail-item svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: #e67e22;
        }

        .directions-btn {
          background: #e67e22;
          color: white;
          border: none;
          padding: 16px 40px;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .directions-btn:hover {
          background: #d67019;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(230, 126, 34, 0.3);
        }

        .visit-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          height: 600px;
        }

        .image-left, .image-right {
          overflow: hidden;
          border-radius: 4px;
        }

        .image-left { align-self: center; }
        .image-right { align-self: flex-start; margin-top: 300px; }

        .visit-images img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        @media (max-width: 968px) {
          .visit-section {
            padding: 20px; /* Reduced from 80px */
          }
          .visit-container { grid-template-columns: 1fr; gap: 40px; }
          .directions-btn { width: 100%; text-align: center; }
        }

        @media (max-width: 600px) {
          .visit-section { padding: 0 16px; }
          .visit-images { grid-template-columns: 1fr; height: auto; }
          .image-left, .image-right { height: 350px; margin-top: 0 !important; }
        }
      `}</style>
    </>
  )
}