import React, { useState } from 'react';

const FilterBar = ({
  sports,
  selectedSport,
  onSportChange,
  selectedStatus,
  onStatusChange,
  showHdOnly,
  onShowHdOnlyChange,
  showPopularOnly,
  onShowPopularOnlyChange,
  sortBy,
  onSortByChange,
  sortOrder, // 'asc' or 'desc' for date
  onSortOrderChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Menu Toggle Button */}
      <div className="2xl:hidden flex z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-xl text-emerald-400 transition-colors"
        >
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Filter Options Container */}
      <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} 2xl:flex flex-col 2xl:flex-row absolute 2xl:relative right-0 top-full 2xl:top-auto z-50 bg-slate-900 2xl:bg-transparent p-4 2xl:p-0 rounded-xl border border-white/10 2xl:border-none shadow-2xl 2xl:shadow-none items-stretch 2xl:items-center gap-4 2xl:gap-5 text-xs 2xl:text-sm mt-4 2xl:mt-0 min-w-[280px] 2xl:min-w-max transform translate-x-3 2xl:translate-x-0`}>
        {/* Sport Category Filter as Pills */}
        <div className="flex flex-wrap 2xl:flex-nowrap items-center gap-1.5 2xl:gap-2 bg-slate-800/50 p-1 2xl:p-1.5 rounded-xl border border-white/5 w-full 2xl:w-auto">
        <button
          onClick={() => onSportChange('all')}
          className={`px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-lg text-xs 2xl:text-sm font-medium transition-all duration-200 ${
            selectedSport === 'all' 
              ? 'bg-emerald-500 text-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          All
        </button>
        {sports.slice(0, 4).map((sport) => ( // Show top 4 sports as pills
          <button
            key={sport.id}
            onClick={() => onSportChange(sport.name.toLowerCase())}
            className={`px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-lg text-xs 2xl:text-sm font-medium transition-all duration-200 ${
              selectedSport === sport.name.toLowerCase()
                ? 'bg-emerald-500 text-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {sport.name}
          </button>
        ))}
        {/* Optional: Add a select dropdown here if there are more than 4 sports */}
      </div>

      <div className="h-8 w-px bg-white/10 hidden 2xl:block"></div>

      {/* Status Filter */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <select
          id="status-filter"
          className="appearance-none bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/10 rounded-xl pl-8 2xl:pl-9 pr-6 2xl:pr-8 py-1.5 2xl:py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer text-xs 2xl:text-sm"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">Any Status</option>
          <option value="live">Live Now</option>
          <option value="today">Today</option>
          <option value="upcoming">Upcoming</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <div className="h-8 w-px bg-white/10 hidden 2xl:block"></div>

      {/* Quality & Popular Toggles */}
      <div className="flex items-center gap-2 2xl:gap-4 bg-slate-800/50 p-1 2xl:p-1.5 px-2 2xl:px-3 rounded-xl border border-white/5 whitespace-nowrap">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={showHdOnly} onChange={(e) => onShowHdOnlyChange(e.target.checked)} />
            <div className={`block w-8 h-5 2xl:w-10 2xl:h-6 rounded-full transition-colors duration-300 ${showHdOnly ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
            <div className={`dot absolute left-1 top-0.5 2xl:top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${showHdOnly ? 'transform translate-x-3 2xl:translate-x-4' : ''}`}></div>
          </div>
          <div className="ml-1.5 2xl:ml-2 font-medium text-slate-300 group-hover:text-white transition-colors text-xs 2xl:text-sm">HD</div>
        </label>

        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={showPopularOnly} onChange={(e) => onShowPopularOnlyChange(e.target.checked)} />
            <div className={`block w-8 h-5 2xl:w-10 2xl:h-6 rounded-full transition-colors duration-300 ${showPopularOnly ? 'bg-pink-500' : 'bg-slate-700'}`}></div>
            <div className={`dot absolute left-1 top-0.5 2xl:top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${showPopularOnly ? 'transform translate-x-3 2xl:translate-x-4' : ''}`}></div>
          </div>
          <div className="ml-1.5 2xl:ml-2 font-medium text-slate-300 group-hover:text-white transition-colors flex items-center gap-1 text-xs 2xl:text-sm">
            <svg className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
            Hot
          </div>
        </label>
      </div>

      <div className="h-8 w-px bg-white/10 hidden 2xl:block"></div>

      {/* Sort By */}
      <div className="flex items-center gap-1 2xl:gap-2 whitespace-nowrap">
        <div className="relative">
          <select
            id="sort-by"
            className="appearance-none bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/10 rounded-xl pl-3 2xl:pl-4 pr-6 2xl:pr-8 py-1.5 2xl:py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer text-xs 2xl:text-sm"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            <option value="date">Sort: Date</option>
            <option value="popularity">Sort: Popularity</option>
            <option value="sport">Sort: Sport</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
        
        {sortBy === 'date' && (
          <button
             onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
             className="p-1.5 2xl:p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-xl text-emerald-400 transition-colors"
             title={`Switch to ${sortOrder === 'asc' ? 'Latest' : 'Earliest'} First`}
          >
            <svg className={`h-4 w-4 2xl:h-5 2xl:w-5 transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default FilterBar;
