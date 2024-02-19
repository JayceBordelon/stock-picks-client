import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Volatile from './pages/Volatile'; 
import Popular from './pages/Popular'; 
import Saved from './pages/Saved'; 
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white font-hebo min-h-screen">
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/volatile" element={<Volatile />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
