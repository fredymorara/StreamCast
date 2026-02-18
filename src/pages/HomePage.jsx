import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import MatchCard from '../components/MatchCard';
import FilterBar from '../components/FilterBar';
import HeroSection from '../components/HeroSection';
import { MatchCardSkeleton } from '../components/LoadingSpinner';
import { api } from '../services/api';

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredMatch, setFeaturedMatch] = useState(null);

  // Filter and Sort States
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('live'); // Default to live matches
  const [showHdOnly, setShowHdOnly] = useState(false);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      let fetchedMatches = [];

      if (selectedStatus === 'live') {
        fetchedMatches = await api.getLiveMatches();
      } else if (selectedStatus === 'today') {
        fetchedMatches = await api.getTodayMatches();
      } else {
        fetchedMatches = await api.getAllMatches();
      }

      if (selectedSport !== 'all') {
        fetchedMatches = fetchedMatches.filter(match =>
          match.sport.toLowerCase() === selectedSport
        );
      }

      if (showHdOnly) {
        fetchedMatches = fetchedMatches.filter(match =>
          match.sources && match.sources.some(source => source.hd)
        );
      }

      if (showPopularOnly) {
        fetchedMatches = fetchedMatches.filter(match => match.popular);
      }

      fetchedMatches.sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'asc' ? a.date - b.date : b.date - a.date;
        }
        if (sortBy === 'popularity') {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return 0;
        }
        if (sortBy === 'sport') {
          return a.sport.localeCompare(b.sport);
        }
        return 0;
      });

      setMatches(fetchedMatches);

      let currentFeaturedMatch = null;
      if (fetchedMatches.length > 0) {
        currentFeaturedMatch = fetchedMatches.find(match => match.isLive && match.popular);
        if (!currentFeaturedMatch) {
          currentFeaturedMatch = fetchedMatches.find(match => match.isLive);
        }
        if (!currentFeaturedMatch) {
          currentFeaturedMatch = fetchedMatches[0];
        }
      }
      setFeaturedMatch(currentFeaturedMatch);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching matches:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedSport, selectedStatus, showHdOnly, showPopularOnly, sortBy, sortOrder]);

  useEffect(() => {
    const fetchSportsCategories = async () => {
      try {
        const sportsData = await api.getSports();
        setSports(sportsData);
      } catch (err) {
        console.error("Error fetching sports categories:", err);
      }
    };

    fetchSportsCategories();
    fetchMatches();
  }, [fetchMatches]);

  const getPageTitle = () => {
    switch (selectedStatus) {
      case 'live': return 'Live Matches';
      case 'today': return 'Today\'s Matches';
      case 'upcoming': return 'Upcoming Matches';
      case 'all': return 'All Matches';
      default: return 'Matches';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="container mx-auto p-4">
          <FilterBar
            sports={[]}
            selectedSport={selectedSport}
            onSportChange={setSelectedSport}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            showHdOnly={showHdOnly}
            onShowHdOnlyChange={setShowHdOnly}
            showPopularOnly={showPopularOnly}
            onShowPopularOnlyChange={setShowPopularOnly}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <MatchCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="container mx-auto p-4">
          <p className="text-red-600 text-xl text-center">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="container mx-auto p-4">
        <HeroSection featuredMatch={featuredMatch} />
        <FilterBar
          sports={sports}
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showHdOnly={showHdOnly}
          onShowHdOnlyChange={setShowHdOnly}
          showPopularOnly={showPopularOnly}
          onShowPopularOnlyChange={setShowPopularOnly}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
        <h2 className="text-slate-800 text-3xl font-bold mb-6">{getPageTitle()}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matches.length > 0 ? (
            matches.map((match) => <MatchCard key={match.id} match={match} />)
          ) : (
            <p className="text-slate-600 col-span-full text-center">No matches available with current filters.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
