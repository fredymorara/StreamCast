import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx'; // This App.jsx now renders HomePage by default
import PlayerPage from './pages/PlayerPage.jsx';
import StreamViewPage from './pages/StreamViewPage.jsx'; // Import StreamViewPage

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/watch/:matchId" element={<PlayerPage />} />
        <Route path="/stream/:matchId/:sourceId/:streamId" element={<StreamViewPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
