import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const PLACEHOLDER_IMAGE_URL =
  "https://via.placeholder.com/400x200?text=No+Image";

const MatchCard = ({ match }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(match.date * 1000).toLocaleString();

  const imageUrl = match.poster
    ? api.getPosterUrl(match.poster)
    : PLACEHOLDER_IMAGE_URL;

  return (
    <div
      className="rounded-lg shadow-lg overflow-hidden relative group cursor-pointer aspect-video bg-slate-900"
      onClick={() => navigate(`/watch/${match.id}`)}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={`${match.title} poster`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-white">
        {/* Top Row: Badges & Status */}
        <div className="flex items-start justify-between relative z-20">
          {/* Team Badges */}
          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm p-2 rounded-lg pointer-events-auto shadow-md">
            {match.teams?.home?.badge && (
              <img
                src={api.getBadgeUrl(match.teams.home.badge)}
                alt={`${match.teams.home.name} Badge`}
                className="w-6 h-6 md:w-8 md:h-8 object-contain"
              />
            )}
            {match.teams?.away?.badge && (
              <img
                src={api.getBadgeUrl(match.teams.away.badge)}
                alt={`${match.teams.away.name} Badge`}
                className="w-6 h-6 md:w-8 md:h-8 object-contain"
              />
            )}
          </div>
          
          {/* Status Indicators */}
          <div className="flex flex-col items-end space-y-1 text-xs md:text-sm shadow-sm pointer-events-auto">
            {match.sources && match.sources.some((source) => source.hd) && (
              <span className="bg-green-500/90 backdrop-blur-sm text-white px-2 py-0.5 rounded font-bold shadow">
                HD
              </span>
            )}
            {match.popular && (
              <span className="bg-yellow-500/90 backdrop-blur-sm text-black px-2 py-0.5 rounded font-bold shadow">
                Popular
              </span>
            )}
            {match.sources && (
              <span className="bg-slate-800/80 backdrop-blur-sm px-2 py-0.5 rounded shadow whitespace-nowrap">
                {match.sources.length} Streams
              </span>
            )}
          </div>
        </div>

        {/* Center: Play Button (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-16 h-16 bg-emerald-600/90 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>

        {/* Bottom Row: Title & Date */}
        <div className="mt-auto pointer-events-none z-20">
          <h3 className="text-lg md:text-xl font-bold leading-tight mb-1 line-clamp-2 drop-shadow-lg text-white">
            {match.title}
          </h3>
          <p className="text-slate-300 text-xs md:text-sm font-medium drop-shadow-md flex items-center">
            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
