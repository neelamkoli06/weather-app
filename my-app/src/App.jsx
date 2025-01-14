import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Settings from './Pages/Settings';
import Navbar from './components/Navbar';
import './styles.css';

function App() {
  
  const [unit, setUnit] = useState('metric');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home unit={unit} setUnit={setUnit} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path="/settings" element={<Settings unit={unit} setUnit={setUnit} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
