import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/1200x400?text=Featured+Match';

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
  const backgroundImage = featuredMatch.poster ? api.getPosterUrl(featuredMatch.poster) : PLACEHOLDER_IMAGE_URL;

  return (
    <div
      className="relative bg-cover bg-center rounded-lg shadow-lg p-8 mb-8 text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 leading-tight drop-shadow-md">
            {featuredMatch.title}
          </h2>
          <p className="text-lg md:text-2xl text-slate-200 mb-4 drop-shadow-sm">
            📅 {formattedDate}
          </p>
          {featuredMatch.isLive && (
            <span className="bg-red-600 text-white text-base md:text-lg px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold shadow-lg animate-pulse inline-block">
              🔴 LIVE NOW
            </span>
          )}
        </div>

        <div className="text-center md:text-right mt-4 md:mt-0 w-full md:w-auto">
          <button
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
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
