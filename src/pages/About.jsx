import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function AboutPage() {
  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
      <Navbar cartCount={0} openCart={() => {}} />
      
      <div style={{ minHeight: '100vh', padding: '120px 20px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '40px', }}>
            About Vedanta Restaurant
          </h1>
          
          <div style={{ display: 'grid', gap: '40px', fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
            <section>
              <h2 style={{ fontSize: '32px', marginBottom: '20px',  color: '#1a1a1a' }}>
                Our Story
              </h2>
              <p>
                Founded in the heart of Delhi, Vedanta Restaurant has been serving authentic North Indian cuisine 
                for over a decade. Our journey began with a simple vision: to bring the rich flavors of traditional 
                Indian cooking to families seeking genuine, homestyle meals in a warm and welcoming atmosphere.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '32px', marginBottom: '20px',  color: '#1a1a1a' }}>
                Our Philosophy
              </h2>
              <p>
                At Vedanta, we believe that food is more than just sustenance—it's a celebration of culture, 
                tradition, and love. Every dish we serve is prepared with carefully selected ingredients and 
                traditional cooking methods passed down through generations. Our chefs take pride in maintaining 
                authenticity while ensuring each meal is a delightful experience.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '32px', marginBottom: '20px',  color: '#1a1a1a' }}>
                What Makes Us Special
              </h2>
              <ul style={{ paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>Authentic North Indian recipes prepared by experienced chefs</li>
                <li style={{ marginBottom: '10px' }}>Fresh ingredients sourced daily from trusted suppliers</li>
                <li style={{ marginBottom: '10px' }}>Vegetarian and non-vegetarian options to suit every palate</li>
                <li style={{ marginBottom: '10px' }}>Warm, family-friendly ambiance perfect for all occasions</li>
                <li style={{ marginBottom: '10px' }}>Commitment to quality, taste, and customer satisfaction</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '32px', marginBottom: '20px',  color: '#1a1a1a' }}>
                Visit Us
              </h2>
              <p>
                Located in Munirka, New Delhi, we invite you to experience the flavors that have made us a 
                favorite among food lovers. Whether you're dining in with family, ordering for a special occasion, 
                or simply craving authentic Indian cuisine, Vedanta Restaurant is here to serve you with love and care.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}