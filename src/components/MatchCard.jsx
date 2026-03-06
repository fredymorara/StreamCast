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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group">
      {/* Match Poster Image */}
      <img
        src={imageUrl}
        alt={`${match.title} poster`}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="p-4">
        {/* Teams and Title */}
        <h3 className="text-slate-900 text-lg font-semibold mb-2 line-clamp-2">
          🏆 {match.title} 🏆
        </h3>

        {/* Team Badges */}
        <div className="flex items-center space-x-2 mb-2">
          {match.teams?.home?.badge && (
            <img
              src={api.getBadgeUrl(match.teams.home.badge)}
              alt={`${match.teams.home.name} Badge`}
              className="w-6 h-6 object-contain"
            />
          )}
          {match.teams?.away?.badge && (
            <img
              src={api.getBadgeUrl(match.teams.away.badge)}
              alt={`${match.teams.away.name} Badge`}
              className="w-6 h-6 object-contain"
            />
          )}
        </div>

        {/* Date & Time */}
        <p className="text-slate-600 text-sm mb-3">📅 {formattedDate}</p>

        {/* Status Indicators */}
        <div className="flex items-center space-x-2 text-sm mb-4">
          {/* We rely on the parent or category for "Live" status, or just show popular if API doesn't specify 'isLive' per-match explicitly */}
          {match.sources && match.sources.some((source) => source.hd) && (
            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">
              HD
            </span>
          )}
          {match.sources && (
            <span className="text-slate-600">
              {match.sources.length} Streams
            </span>
          )}
          {match.popular && (
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded-full font-bold">
              Popular
            </span>
          )}
        </div>

        {/* Watch Now Button */}
        <button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          onClick={() => navigate(`/watch/${match.id}`)}
        >
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
