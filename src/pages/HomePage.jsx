import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import FilterBar from "../components/FilterBar";
import HeroSection from "../components/HeroSection";
import LoadingSpinner, { MatchCardSkeleton } from "../components/LoadingSpinner";
import { api } from "../services/api";

const HomePage = () => {
  const [rawMatches, setRawMatches] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and Sort States
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all"); // Default to all matches
  const [showHdOnly, setShowHdOnly] = useState(false);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  // Fetch matches whenever the status category changes
  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      let fetchedMatches = [];

      if (selectedStatus === "live") {
        fetchedMatches = await api.getLiveMatches();
      } else if (selectedStatus === "today") {
        fetchedMatches = await api.getTodayMatches();
      } else {
        fetchedMatches = await api.getAllMatches();
      }

      setRawMatches(fetchedMatches);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching matches:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  // Use useMemo to filter and categorize matches derived from rawMatches
  const { liveMatches, upcomingMatches } = React.useMemo(() => {
    let filtered = [...rawMatches];

    // Note: The API docs show the sport categorizer is called 'category', not 'sport'
    if (selectedSport !== "all") {
      filtered = filtered.filter(
        (match) =>
          match.category && match.category.toLowerCase() === selectedSport,
      );
    }

    if (showHdOnly) {
      filtered = filtered.filter(
        (match) => match.sources && match.sources.some((source) => source.hd),
      );
    }

    if (showPopularOnly) {
      filtered = filtered.filter((match) => match.popular);
    }

    // Split into live vs upcoming
    const currentTime = Date.now();
    const live = [];
    const upcoming = [];

    filtered.forEach((match) => {
      // Logic for determining if a match is "live"
      const isTaggedLive = match.status && match.status.toLowerCase() === 'live';
      const hasReachedTimeAndHasStreams = match.date <= currentTime && match.sources && match.sources.length > 0;

      if (isTaggedLive || hasReachedTimeAndHasStreams) {
        live.push(match);
      } else {
        upcoming.push(match);
      }
    });

    // Custom sorting for Live Matches
    // 1. Football
    // 2. Popular
    // 3. Date (descending or ascending based on preference, but we'll use the default sortBy)
    // 4. Other sports
    live.sort((a, b) => {
      const isFootballA = a.category && a.category.toLowerCase() === 'football';
      const isFootballB = b.category && b.category.toLowerCase() === 'football';

      if (isFootballA && !isFootballB) return -1;
      if (!isFootballA && isFootballB) return 1;

      // If both are football, or both are NOT football, then sort by popular
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;

      // Fallback to the user's selected sort logic
      if (sortBy === "date") {
        return sortOrder === "asc" ? a.date - b.date : b.date - a.date;
      }
      if (sortBy === "sport") {
        const catA = a.category || "";
        const catB = b.category || "";
        return catA.localeCompare(catB);
      }

      return 0;
    });

    // Custom sorting for Upcoming Matches
    // 1. Football
    // 2. Chronological order (closest to current time first)
    upcoming.sort((a, b) => {
      const isFootballA = a.category && a.category.toLowerCase() === 'football';
      const isFootballB = b.category && b.category.toLowerCase() === 'football';

      if (isFootballA && !isFootballB) return -1;
      if (!isFootballA && isFootballB) return 1;

      // Both are football, or both are NOT football, sort by closest date
      return a.date - b.date;
    });

    return { liveMatches: live, upcomingMatches: upcoming };
  }, [
    rawMatches,
    selectedSport,
    showHdOnly,
    showPopularOnly,
    sortBy,
    sortOrder,
  ]);

  const filterProps = {
    sports,
    selectedSport,
    onSportChange: setSelectedSport,
    selectedStatus,
    onStatusChange: setSelectedStatus,
    showHdOnly,
    onShowHdOnlyChange: setShowHdOnly,
    showPopularOnly,
    onShowPopularOnlyChange: setShowPopularOnly,
    sortBy,
    onSortByChange: setSortBy,
    sortOrder,
    onSortOrderChange: setSortOrder,
  };

  const featuredMatch = React.useMemo(() => {
    let currentFeaturedMatch = null;
    if (liveMatches.length > 0) {
      currentFeaturedMatch = liveMatches.find((match) => match.popular) || liveMatches[0];
    } else if (upcomingMatches.length > 0) {
      currentFeaturedMatch = upcomingMatches[0];
    }
    return currentFeaturedMatch;
  }, [liveMatches, upcomingMatches]);

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
      case "live":
        return "Live Matches";
      case "today":
        return "Today's Matches";
      case "upcoming":
        return "Upcoming Matches";
      case "all":
        return "All Matches";
      default:
        return "Matches";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-slate-900 flex flex-col">
        <Header filterProps={filterProps} />
        <main className="container mx-auto p-4 flex-grow flex flex-col items-center justify-center">
          <LoadingSpinner color="#99ec09ff" size="100" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-slate-900">
        <Header />
        <main className="container mx-auto p-4">
          <p className="text-red-600 text-xl text-center">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-900">
      <Header filterProps={filterProps} />
      <main className="container mx-auto p-4">
        <HeroSection featuredMatch={featuredMatch} />
        <h2 className="text-white text-3xl font-bold mb-6 shadow-black/50 drop-shadow-md">
          {getPageTitle()}
        </h2>

        {/* Live Matches Section */}
        {selectedStatus !== 'upcoming' && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
              <h3 className="text-white text-2xl font-semibold shadow-black/50 drop-shadow-md">Live Matches</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {liveMatches.length > 0 ? (
                liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <p className="text-slate-600 col-span-full py-8 text-center bg-slate-50 rounded-lg border border-slate-200">
                  No live matches available with current filters.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Upcoming Matches Section */}
        {selectedStatus !== 'live' && (
          <div>
            <h3 className="text-white text-2xl font-semibold mb-6 flex items-center gap-2 shadow-black/50 drop-shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upcoming Matches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingMatches.length > 0 ? (
                upcomingMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <p className="text-slate-600 col-span-full py-8 text-center bg-slate-50 rounded-lg border border-slate-200">
                  No upcoming matches available with current filters.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
