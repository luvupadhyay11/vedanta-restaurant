import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials = [
    {
      id: 1,
      quote: "Vedanta Restaurant serves the most authentic North Indian cuisine in Delhi! The Butter Chicken is very tasty, and the Dal Makhni tastes just like homemade. The service is impeccable and the ambiance is perfect for family dinners.",
      name: "Priya Sharma",
      role: "Food Critic"
    },
    {
      id: 2,
      quote: "I've been visiting Vedanta for over two years now, and it never disappoints. The Tandoori Chicken is perfectly cooked, and their Paneer Tikka melts in your mouth. The staff remembers my preferences, which makes me feel like family!",
      name: "Rajesh Kumar",
      role: "Regular Customer"
    },
    {
      id: 3,
      quote: "Food is the foundation of true happiness, and Vedanta Restaurant proves this every single time! Their Mutton Rogan Josh is spectacular, and the freshly baked Butter Naan is a must-try. Best dining experience in Munirka!",
      name: "Anita Verma",
      role: "Food Blogger"
    },
    {
      id: 4,
      quote: "As a vegetarian, I'm always looking for great veg options, and Vedanta exceeds all expectations. The Paneer Butter Masala and Malai Kofta are rich and flavorful. Portions are generous and prices are reasonable. Highly recommend!",
      name: "Amit Patel",
      role: "Food Enthusiast"
    },
    {
      id: 5,
      quote: "Vedanta Restaurant is our family's favorite spot for weekend dinners. The Chicken Biryani is aromatic and perfectly spiced, and the Kashmiri Pulao is a delightful treat. The cozy atmosphere makes every visit memorable!",
      name: "Neha Singh",
      role: "Marketing Professional"
    },
    {
      id: 6,
      quote: "Outstanding food quality and presentation! The Tawa Mutton Kabab is tender and flavorful, and their desserts are absolutely delicious. Whether it's a casual meal or special celebration, Vedanta is always my first choice in Delhi.",
      name: "Vikram Malhotra",
      role: "Business Owner"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true)
      setCurrentIndex(index)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  // Calculate visible testimonials (3 at a time)
  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push({ ...testimonials[index], position: i })
    }
    return visible
  }

  return (
    <>
      <section className="testimonials-section">
        <div className="testimonials-container">
          {/* Header */}
          <div className="testimonials-header">
            <div className="header-line"></div>
            <span className="header-subtitle">TESTIMONIALS</span>
            <div className="header-line"></div>
          </div>

          <h2 className="testimonials-title">WHAT PEOPLE ARE SAYING</h2>
          
          <p className="testimonials-description">
            Our customers share their experiences dining at Vedanta Restaurant. 
            From traditional flavors to modern ambiance, discover why people love us.
          </p>

          {/* Testimonials Slider */}
          <div className="testimonials-slider-wrapper">
            <button 
              className="slider-arrow left" 
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="testimonials-slider">
              {getVisibleTestimonials().map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${testimonial.position === 1 ? 'center' : ''}`}
                >
                  <div className="quote-icon">"</div>
                  <p className="testimonial-quote">{testimonial.quote}</p>
                  
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="slider-arrow right" 
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="testimonials-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');

        .testimonials-section {
          padding: 0 20px 100px;
          margin-top: 10px;
          background: #f9f9f9;
        }

        .testimonials-container {
          max-width: 1400px;
          margin: 10px auto;
        }

        /* Header */
        .testimonials-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .header-line {
          width: 60px;
          height: 1px;
          background: #e67e22;
        }

        .header-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #e67e22;
          text-transform: uppercase;
        }

        .testimonials-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 400;
          text-align: center;
          color: #1a1a1a;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }

        .testimonials-description {
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          line-height: 1.8;
          text-align: center;
          color: #666;
          max-width: 700px;
          margin: 0 auto 60px;
        }

        /* Slider Wrapper */
        .testimonials-slider-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 50px;
        }

        .slider-arrow {
          background: white;
          border: 2px solid #e0e0e0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          color: #666;
        }

        .slider-arrow:hover {
          background: #e67e22;
          color: white;
          border-color: #e67e22;
          transform: scale(1.1);
        }

        .slider-arrow.left {
          order: 0;
        }

        .slider-arrow.right {
          order: 2;
        }

        /* Testimonials Slider */
        .testimonials-slider {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          order: 1;
        }

        .testimonial-card {
          background: white;
          padding: 40px 30px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          transition: all 0.4s ease;
          opacity: 0.6;
          transform: scale(0.95);
        }

        .testimonial-card.center {
          opacity: 1;
          transform: scale(1);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .testimonial-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          opacity: 1;
        }

        .quote-icon {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          line-height: 1;
          color: #e67e22;
          margin-bottom: 10px;
        }

        .testimonial-quote {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 30px;
          min-height: 180px;
        }

        /* Author */
        .testimonial-author {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .author-info {
          text-align: center;
        }

        .author-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 5px 0;
        }

        .author-role {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          color: #999;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Pagination Dots */
        .testimonials-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot:hover {
          background: #bbb;
          transform: scale(1.2);
        }

        .dot.active {
          background: #e67e22;
          width: 12px;
          height: 12px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .testimonials-slider {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }

          .testimonial-card:nth-child(3) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 80px 20px;
          }

          .testimonials-title {
            font-size: 36px;
          }

          .testimonials-description {
            font-size: 15px;
            margin-bottom: 40px;
          }

          .slider-arrow {
            width: 40px;
            height: 40px;
          }

          .testimonials-slider {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .testimonial-card {
            padding: 30px 25px;
            opacity: 1;
            transform: scale(1);
          }

          .testimonial-card:nth-child(2),
          .testimonial-card:nth-child(3) {
            display: none;
          }

          .testimonial-quote {
            min-height: auto;
            font-size: 14px;
          }

          .quote-icon {
            font-size: 60px;
          }
        }

        @media (max-width: 480px) {
          .testimonials-title {
            font-size: 32px;
          }

          .header-line {
            width: 40px;
          }

          .header-subtitle {
            font-size: 12px;
          }

          .testimonials-slider-wrapper {
            gap: 15px;
          }

          .slider-arrow {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  )
}