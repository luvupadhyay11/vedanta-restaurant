import { useState, useEffect } from "react"
import Hero from "../components/Hero"
import Menu from "../components/Menu"
import CartDrawer from "../components/CartDrawer"
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import VisitRestaurant from '../components/VisitRestaurant'
import Testimonials from '../components/Testimonials'


export default function Home() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('restaurantCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('restaurantCart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    setCart(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) {
        return prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
    setOpen(true)
  }

  function updateQty(id, change) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty + change }
            : item
        )
        .filter(item => item.qty > 0)
    )
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>
      
      <Navbar 
        cartCount={cartCount}
        openCart={() => setOpen(true)}
        isHomePage={true}
      />
      <Hero />
      <Menu addToCart={addToCart} limit={8} cart={cart} />
      <VisitRestaurant />
      <Testimonials />
      <Footer />
      
      <CartDrawer
        cart={cart}
        isOpen={open}
        onClose={() => setOpen(false)}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        cartTotal={cartTotal}
      />
    </>
  )
}