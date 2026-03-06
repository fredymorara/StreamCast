import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import FilterBar from "../components/FilterBar";
import HeroSection from "../components/HeroSection";
import { MatchCardSkeleton } from "../components/LoadingSpinner";
import { api } from "../services/api";

const HomePage = () => {
  const [rawMatches, setRawMatches] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and Sort States
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("live"); // Default to live matches
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

  // Use useMemo to filter and sort matches derived from rawMatches
  const displayedMatches = React.useMemo(() => {
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

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc" ? a.date - b.date : b.date - a.date;
      }
      if (sortBy === "popularity") {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return 0;
      }
      if (sortBy === "sport") {
        const catA = a.category || "";
        const catB = b.category || "";
        return catA.localeCompare(catB);
      }
      return 0;
    });

    return filtered;
  }, [
    rawMatches,
    selectedSport,
    showHdOnly,
    showPopularOnly,
    sortBy,
    sortOrder,
  ]);

  const featuredMatch = React.useMemo(() => {
    let currentFeaturedMatch = null;
    if (displayedMatches.length > 0) {
      // API doesn't have `isLive` explicitly described, but we might be in the live category
      currentFeaturedMatch = displayedMatches.find(
        (match) => selectedStatus === "live" && match.popular,
      );
      if (!currentFeaturedMatch) {
        currentFeaturedMatch = displayedMatches.find(
          (match) => selectedStatus === "live",
        );
      }
      if (!currentFeaturedMatch) {
        currentFeaturedMatch = displayedMatches[0];
      }
    }
    return currentFeaturedMatch;
  }, [displayedMatches, selectedStatus]);

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
        <h2 className="text-slate-800 text-3xl font-bold mb-6">
          {getPageTitle()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedMatches.length > 0 ? (
            displayedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <p className="text-slate-600 col-span-full text-center">
              No matches available with current filters.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
