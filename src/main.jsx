import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx'; // This App.jsx now renders HomePage by default
import PlayerPage from './pages/PlayerPage.jsx'; // We will create this

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* App component now renders HomePage */}
        <Route path="/watch/:matchId" element={<PlayerPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
