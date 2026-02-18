import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const HeroSection = ({ featuredMatch }) => {
  const navigate = useNavigate();
  if (!featuredMatch) {
    return (
      <div className="bg-slate-100 rounded-lg shadow-lg p-8 mb-8 text-center text-slate-900">
        <h2 className="text-4xl font-bold mb-4">Welcome to SpaceStream!</h2>
        <p className="text-xl text-slate-600 mb-6">Your ultimate destination for live football streaming.</p>
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200"
          onClick={() => navigate('/')}
        >
          Explore Matches
        </button>
      </div>
    );
  }

  const formattedDate = new Date(featuredMatch.date * 1000).toLocaleString();

  return (
    <div
      className="relative bg-cover bg-center rounded-lg shadow-lg p-8 mb-8 text-white"
      style={{ backgroundImage: `url(${api.getPosterUrl(featuredMatch.poster)})` }}
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {featuredMatch.title}
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 mb-4">
            📅 {formattedDate}
          </p>
          {featuredMatch.isLive && (
            <span className="bg-red-600 text-white text-lg px-4 py-2 rounded-full font-bold">
              🔴 LIVE NOW
            </span>
          )}
        </div>

        <div className="text-center md:text-right">
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200"
            onClick={() => navigate(`/watch/${featuredMatch.id}`)}
          >
            Watch Now
          </button>
          {/* Optional: Add countdown timer here for upcoming matches */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
