import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Chat from './pages/Chat';
import TrackOrder from './pages/TrackOrder';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import soukImage from './assets/souk.jpg';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-morocco-midnight font-inter text-white selection:bg-morocco-saffron/30 relative">
            {/* Global Background Image with Blur */}
            <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale-[20%] opacity-40 blur-md scale-110"
                style={{ backgroundImage: `url(${soukImage})` }}
              ></div>
              {/* Dark Overlay for better contrast */}
              <div className="absolute inset-0 bg-morocco-midnight/60"></div>
            </div>

            <Navbar />
            <main className="max-w-7xl mx-auto relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/track" element={<TrackOrder />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>

            {/* Decorative Gradients Overlay */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-50">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-morocco-terracotta/20 blur-[120px] rounded-full"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[10%] bg-morocco-emerald/10 blur-[120px] rounded-full"></div>
            </div>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
