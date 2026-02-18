import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import StreamSelector from '../components/StreamSelector';
import { api } from '../services/api';

const PlayerPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [streamsBySource, setStreamsBySource] = useState({});
  const [currentStream, setCurrentStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndSetStreams = useCallback(async (matchData) => {
    const fetchedStreamsBySource = {};
    let initialSelectedStream = null;

    if (matchData && matchData.sources) {
      for (const source of matchData.sources) {
        try {
          const streamList = await api.getStreams(source.source, source.id);
          streamList.sort((a, b) => {
            if (a.hd && !b.hd) return -1;
            if (!a.hd && b.hd) return 1;
            return a.streamNo - b.streamNo;
          });
          fetchedStreamsBySource[source.source] = streamList;

          if (!initialSelectedStream && streamList.length > 0) {
            initialSelectedStream = streamList[0];
          }
        } catch (err) {
          console.error(`Failed to load streams for source ${source.source}:`, err);
          fetchedStreamsBySource[source.source] = [];
        }
      }
    }
    setStreamsBySource(fetchedStreamsBySource);
    setCurrentStream(initialSelectedStream);
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

  const switchStream = (stream) => {
    setCurrentStream(stream);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-700 text-xl">Loading match and stream details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
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

  const formattedDate = new Date(match.date * 1000).toLocaleString();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="container mx-auto p-4 flex flex-col lg:flex-row lg:space-x-6">
        {/* Left Column: Video Player and Match Header */}
        <div className="lg:w-3/4">
          {/* Match Header */}
          <div className="flex items-center mb-4">
            <button onClick={() => navigate('/')} className="text-emerald-600 hover:text-emerald-700 mr-4 text-xl">
              ←
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{match.title}</h1>
              <p className="text-slate-600 text-sm">{formattedDate}</p>
              {match.isLive && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-2">
                  🔴 LIVE
                </span>
              )}
            </div>
          </div>

          {/* Video Player Section */}
          <div className="bg-black aspect-video w-full rounded-lg mb-6 overflow-hidden relative">
            {currentStream && currentStream.embedUrl ? (
              <iframe
                src={currentStream.embedUrl}
                title={`Stream for ${match.title}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-xl">
                {streamsBySource && Object.keys(streamsBySource).length > 0 ? (
                  <p>No streams selected or available for playback.</p>
                ) : (
                  <p>No streams available for this match.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Stream Selector Panel and Match Information Sidebar */}
        <div className="lg:w-1/4 mt-6 lg:mt-0 space-y-6">
          <StreamSelector
            sources={streamsBySource}
            onStreamSelect={switchStream}
            activeStreamId={currentStream ? currentStream.id : null}
          />
          {/* Match Information Sidebar */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Match Information</h3>
            <div className="space-y-2 text-slate-700">
              <p><strong>Sport:</strong> {match.sport}</p>
              <p><strong>League:</strong> {match.league || 'N/A'}</p>
              <p><strong>Home Team:</strong> {match.homeTeam || 'N/A'}</p>
              <p><strong>Away Team:</strong> {match.awayTeam || 'N/A'}</p>
              <p><strong>Status:</strong> {match.isLive ? 'Live' : 'Upcoming/Ended'}</p>
              {/* Add more relevant match details here if available in match object */}
              <p className="text-sm text-slate-500 mt-4">
                (Additional statistics, lineups, or head-to-head history would appear here if available from API)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayerPage;
