import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Volatile from './pages/Volatile';
import Popular from './pages/Popular';
import Saved from './pages/Saved';
import NavBar from './components/NavBar';
import Auth from './pages/Auth';
import Loading from './components/Loading';

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/auth" && location.pathname !== "/" && <NavBar />}
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/volatile" element={<Volatile />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    const pingServer = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/ping`);
        const data = await response.json(); // Correctly parse the JSON response
        if (data.message === "pong") { // Correctly access the message property of the parsed data
          setAwake(true);
          return;
        }
      } catch (error) {
        console.error('Error pinging server:', error);
      }
      setTimeout(pingServer, 5000);
    };

    pingServer();
  }, []);

  return (
    <Router>
      {awake ? <div className="bg-gray-900 text-white font-hebo min-h-screen relative z-0">
        <Layout />
      </div> :
        <div className="bg-gray-900 text-white font-hebo h-screen relative z-0">
          <Loading message="Waking up server..." />
        </div>}
    </Router>
  );
}



export default App;
