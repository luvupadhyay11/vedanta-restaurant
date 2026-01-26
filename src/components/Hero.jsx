import { useState, useEffect, useCallback } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070",
      title: "Welcome Back",
      subtitle: "to Vedanta",
      description: "Experience authentic flavors with our carefully crafted menu. Dine in or order at home — we serve happiness.",
    },
    {
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
      title: "Taste the Magic",
      subtitle: "Feel the Love",
      description: "Every dish tells a story. Crafted with passion, served with care. Your culinary journey begins here.",
    },
    {
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2081",
      title: "Fresh Ingredients",
      subtitle: "Bold Flavors",
      description: "From farm to table, we bring you the finest ingredients. Taste the difference quality makes.",
    },
  ]

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setTimeout(() => setIsAnimating(false), 800)
    }
  }, [isAnimating, slides.length])

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setTimeout(() => setIsAnimating(false), 800)
    }
  }, [isAnimating, slides.length])

  const goToSlide = useCallback((index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true)
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }, [isAnimating, currentSlide])

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 5000)
      return () => clearInterval(timer)
    }
  }, [isPaused, nextSlide])

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu')
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <section 
        className="hero"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
          </div>
        ))}

        <div className="hero-content">
          <div className="content-wrapper" key={currentSlide}>
            <div>
              <h1>{slides[currentSlide].title}</h1>
              <h4 className="subtitle">{slides[currentSlide].subtitle}</h4>
            </div>

            <p className="description">{slides[currentSlide].description}</p>

            <div className="hero-buttons">
              <button className="reservation-btn" onClick={scrollToMenu}>
                Reservation
              </button>
              <button className="menu-btn" onClick={scrollToMenu}>
                See Menu
              </button>
            </div>
          </div>
        </div>


        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          z-index: 0;
        }

        .slide.active {
          opacity: 1;
          z-index: 1;
        }

        .slide-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.45) 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .content-wrapper {
          max-width: 700px;
          color: #ffffff;
          animation: fadeInUp 1s ease-out;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .hero-content h1 {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          line-height: 1.1;
          font-weight: 900;
          color: white;
          text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
          animation: fadeIn 1s ease-out 0.5s both;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .subtitle {
          display: block;
          font-weight: 800;
          font-style: italic;
          animation: fadeIn 1s ease-out 0.5s both;
        }

        .description {
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          line-height: 1.7;
          color: #f2f2f2;
          max-width: 600px;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
          animation: fadeIn 1s ease-out 0.8s both;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          margin-top: 8px;
          animation: fadeIn 1s ease-out 1s both;
        }

        .reservation-btn {
          background: linear-gradient(135deg, #ffb703 0%, #fb8500 100%);
          color: #000;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          border-radius: 28px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(255, 183, 3, 0.5);
        }

        .reservation-btn:hover {
          box-shadow: 0 4px 12px rgba(255, 183, 3, 0.7);
        }

        .menu-btn {
          background: transparent;
          color: white;
          border: 1px solid white;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          border-radius: 28px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .menu-btn:hover {
          background: white;
          color: #000;
        }

        /* Navigation Arrows */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .nav-arrow:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: white;
          transform: translateY(-50%) scale(1.1);
        }

        .nav-arrow.left {
          left: 40px;
        }

        .nav-arrow.right {
          right: 40px;
        }

        /* Slide Indicators */
        .slide-indicators {
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          gap: 12px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: scale(1.2);
        }

        .indicator.active {
          background: #ffb703;
          border-color: #ffb703;
          width: 40px;
          border-radius: 6px;
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        .mouse {
          width: 24px;
          height: 38px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          position: relative;
        }

        .mouse::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          animation: scroll 2s infinite;
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            top: 6px;
          }
          100% {
            opacity: 0;
            top: 20px;
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-content {
            padding: 0 40px;
          }

          .hero-content h1 {
            font-size: 58px;
          }

          .description {
            font-size: 17px;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 0 30px;
          }

          .hero-content h1 {
            font-size: 48px;
          }

          .description {
            font-size: 16px;
            margin-bottom: 30px;
          }

          .hero-buttons {
            flex-direction: column;
            gap: 15px;
          }

          .nav-arrow {
            width: 45px;
            height: 45px;
          }

          .nav-arrow.left {
            left: 20px;
          }

          .nav-arrow.right {
            right: 20px;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 38px;
          }

          .greeting {
            font-size: 12px;
          }

          .description {
            font-size: 15px;
          }

          .nav-arrow {
            display: none;
          }

          .scroll-indicator {
            display: none;
          }
        }
      `}</style>
    </>
  )
}