import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 animate-pulse p-4">
      <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
      <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
      <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
    </div>
  );
};

// Skeleton loader for a MatchCard
export const MatchCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-slate-200"></div> {/* Image placeholder */}
      <div className="p-4">
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div> {/* Title */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-slate-200 rounded-full"></div> {/* Badge 1 */}
          <div className="w-6 h-6 bg-slate-200 rounded-full"></div> {/* Badge 2 */}
        </div>
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div> {/* Date */}
        <div className="flex items-center space-x-2 text-sm mb-4">
          <div className="h-6 bg-slate-200 rounded-full w-16"></div> {/* Live indicator */}
          <div className="h-6 bg-slate-200 rounded-full w-10"></div> {/* HD indicator */}
        </div>
        <div className="w-full h-10 bg-emerald-500 rounded-md"></div> {/* Button */}
      </div>
    </div>
  );
};

export default LoadingSpinner;
