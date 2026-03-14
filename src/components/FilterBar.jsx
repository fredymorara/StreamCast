import React from 'react';

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
  return (
    <div className="flex flex-nowrap items-center gap-3 lg:gap-5 min-w-max text-sm px-2">
      {/* Sport Category Filter as Pills */}
      <div className="flex items-center gap-2 bg-slate-800/50 p-1.5 rounded-xl border border-white/5">
        <button
          onClick={() => onSportChange('all')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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

      <div className="h-8 w-px bg-white/10 hidden md:block"></div>

      {/* Status Filter */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <select
          id="status-filter"
          className="appearance-none bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/10 rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
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

      <div className="h-8 w-px bg-white/10 hidden md:block"></div>

      {/* Quality & Popular Toggles */}
      <div className="flex items-center gap-4 bg-slate-800/50 p-1.5 px-3 rounded-xl border border-white/5">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={showHdOnly} onChange={(e) => onShowHdOnlyChange(e.target.checked)} />
            <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ${showHdOnly ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${showHdOnly ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <div className="ml-2 font-medium text-slate-300 group-hover:text-white transition-colors">HD</div>
        </label>

        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={showPopularOnly} onChange={(e) => onShowPopularOnlyChange(e.target.checked)} />
            <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ${showPopularOnly ? 'bg-pink-500' : 'bg-slate-700'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${showPopularOnly ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <div className="ml-2 font-medium text-slate-300 group-hover:text-white transition-colors flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
            Hot
          </div>
        </label>
      </div>

      <div className="h-8 w-px bg-white/10 hidden md:block"></div>

      {/* Sort By */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            id="sort-by"
            className="appearance-none bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/10 rounded-xl pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
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
             className="p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-xl text-emerald-400 transition-colors"
             title={`Switch to ${sortOrder === 'asc' ? 'Latest' : 'Earliest'} First`}
          >
            <svg className={`h-5 w-5 transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
