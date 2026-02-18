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
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center justify-between">
      {/* Sport Category Filter */}
      <div>
        <label htmlFor="sport-filter" className="text-slate-700 mr-2">Sport:</label>
        <select
          id="sport-filter"
          className="bg-slate-100 text-slate-900 border border-slate-300 rounded px-3 py-1"
          value={selectedSport}
          onChange={(e) => onSportChange(e.target.value)}
        >
          <option value="all">All Sports</option>
          {sports.map((sport) => (
            <option key={sport.id} value={sport.name.toLowerCase()}>{sport.name}</option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="status-filter" className="text-slate-700">Status:</label>
        <select
          id="status-filter"
          className="bg-slate-100 text-slate-900 border border-slate-300 rounded px-3 py-1"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="live">Live Now</option>
          <option value="today">Today's Matches</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {/* Quality Filter */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hd-only"
          className="form-checkbox h-4 w-4 text-emerald-600 focus:ring-emerald-500 transition duration-150 ease-in-out"
          checked={showHdOnly}
          onChange={(e) => onShowHdOnlyChange(e.target.checked)}
        />
        <label htmlFor="hd-only" className="ml-2 text-slate-700">HD Available</label>
      </div>

      {/* Popular Matches Filter */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="popular-only"
          className="form-checkbox h-4 w-4 text-emerald-600 focus:ring-emerald-500 transition duration-150 ease-in-out"
          checked={showPopularOnly}
          onChange={(e) => onShowPopularOnlyChange(e.target.checked)}
        />
        <label htmlFor="popular-only" className="ml-2 text-slate-700">Popular</label>
      </div>

      {/* Sort By */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-by" className="text-slate-700">Sort by:</label>
        <select
          id="sort-by"
          className="bg-slate-100 text-slate-900 border border-slate-300 rounded px-3 py-1"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="popularity">Popularity</option>
          <option value="sport">Sport Category</option>
        </select>
        {sortBy === 'date' && (
          <select
            id="sort-order"
            className="bg-slate-100 text-slate-900 border border-slate-300 rounded px-3 py-1"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value)}
          >
            <option value="asc">Earliest First</option>
            <option value="desc">Latest First</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
