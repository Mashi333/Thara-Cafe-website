import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import MyOrders from './pages/MyOrders'
import Verify from './pages/Verify'
import Admin from './pages/Admin'
import LoginPopup from './components/LoginPopup'
import { StoreContextProvider } from './context/StoreContext'
import Footer from './components/Footer'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <StoreContextProvider>
      <div className="app">
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        {!isAdmin && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        {!isAdmin && <Footer />}
      </div>
    </StoreContextProvider>
  )
}

export default App
