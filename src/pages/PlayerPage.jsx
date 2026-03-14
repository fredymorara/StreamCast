import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import StreamSelector from '../components/StreamSelector';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../services/api';

const PlayerPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [streamsBySource, setStreamsBySource] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndSetStreams = useCallback(async (matchData) => {
    const fetchedStreamsBySource = {};
    if (matchData && matchData.sources) {
      for (const source of matchData.sources) {
        try {
          const streamList = await api.getStreams(source.source, source.id);

          // Custom sorting logic for streams
          streamList.sort((a, b) => {
            const getSourcePriority = (s) => {
              if (s.source === 'echo' && s.hd) return 3; // Echo HD highest priority
              if (s.source === 'admin') return 2;        // Admin second priority
              return 1;                                 // Others third priority
            };

            const priorityA = getSourcePriority(a);
            const priorityB = getSourcePriority(b);

            if (priorityA !== priorityB) {
              return priorityB - priorityA; // Higher priority first
            }

            // Within the same priority, sort by HD (HD first)
            if (a.hd !== b.hd) {
              return a.hd ? -1 : 1;
            }

            // Within same HD status, sort by stream number
            return a.streamNo - b.streamNo;
          });
          fetchedStreamsBySource[source.source] = streamList;
        } catch (err) {
          console.error(`Failed to load streams for source ${source.source}:`, err);
          fetchedStreamsBySource[source.source] = [];
        }
      }
    }
    setStreamsBySource(fetchedStreamsBySource);
  }, []);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        const allMatches = await api.getAllMatches(); // Fetch all to find the match
        const foundMatch = allMatches.find(m => m.id === matchId);

        if (foundMatch) {
          setMatch(foundMatch);
          await fetchAndSetStreams(foundMatch);
        } else {
          setError("Match not found.");
        }
      } catch (err) {
        setError("Failed to load match details.");
        console.error("Error fetching match details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (matchId) {
      fetchMatchDetails();
    } else {
      setError("No match ID provided.");
      setLoading(false);
    }
  }, [matchId, fetchAndSetStreams]);

  // This function now navigates to the StreamViewPage
  const handleStreamSelect = (stream) => {
    // We pass the entire stream object, or at least enough info to reconstruct it
    // For simplicity, I'll pass relevant IDs and source.
    navigate(`/stream/${matchId}/${stream.sourceId}/${stream.streamNo}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingSpinner color="#99ec09ff" size="100"/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto p-4">
          <p className="text-red-600 text-xl text-center">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Home
          </button>
        </main>
      </div>
    );
  }

  if (!match) {
    return null;
  }

  return (
    <div className="min-h-screen text-slate-900">
      <Header />
      <main className="container mx-auto p-4 flex flex-col">
        {/* Match Header */}
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/')} className="text-emerald-600 hover:text-emerald-700 mr-4 text-xl flex items-center">
            ← <span className="ml-1 font-bold text-base">Back</span>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Live {match.title} Stream Links</h1>
            <p className="text-slate-200 text-sm">To watch {match.title} streams, choose a stream link below.</p>
          </div>
        </div>

        {/* Stream Selector Panel */}
        <StreamSelector
          sources={streamsBySource}
          onStreamSelect={handleStreamSelect}
          activeStreamId={null} // No active stream on this page
        />
      </main>
    </div>
  );
};

export default PlayerPage;
