import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import MenuPage from "./pages/MenuPage"
import About from "./pages/About"
import Contact from "./pages/Contact"
import OrderForm from "./pages/OrderForm"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import MenuSelection from './pages/Menuselection'
import AddNewDish from "./pages/AddNewDish"
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orderform" element={<OrderForm />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/menuselection" element={<MenuSelection />}/>
        <Route path="/addnewdish" element={<AddNewDish />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App