import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { api } from '../services/api';

const StreamViewPage = () => {
  const { matchId, sourceId, streamId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch match details
        const allMatches = await api.getAllMatches();
        const foundMatch = allMatches.find(m => m.id === matchId);

        if (!foundMatch) {
          setError("Match not found.");
          setLoading(false);
          return;
        }
        setMatch(foundMatch);

        // Fetch stream details for the specific sourceId and streamId
        const streamList = await api.getStreams(sourceId, foundMatch.sources.find(s => s.source === sourceId).id); // Assuming source.id is consistent
        const foundStream = streamList.find(s => s.id === streamId);

        if (!foundStream) {
          setError("Stream not found.");
          setLoading(false);
          return;
        }
        setStream(foundStream);

      } catch (err) {
        setError("Failed to load stream. Please try again later.");
        console.error("Error fetching stream data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (matchId && sourceId && streamId) {
      fetchData();
    } else {
      setError("Invalid stream URL.");
      setLoading(false);
    }
  }, [matchId, sourceId, streamId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-700 text-xl">Loading stream...</p>
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
            onClick={() => navigate(`/watch/${matchId}`)} // Go back to stream selection
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            ← Back to Stream Links
          </button>
        </main>
      </div>
    );
  }

  if (!match || !stream || !stream.embedUrl) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-700 text-xl">Stream data incomplete or not available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="container mx-auto p-4">
        {/* Stream View Header */}
        <div className="flex items-center mb-4">
            <button onClick={() => navigate(`/watch/${matchId}`)} className="text-emerald-600 hover:text-emerald-700 mr-4 text-xl flex items-center">
              ← <span className="ml-1 font-bold text-base">Back to Stream Links</span>
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{match.title}</h1>
              <p className="text-slate-600 text-sm">Streaming from {sourceId} - Stream {stream.streamNo}</p>
            </div>
          </div>

        {/* Video Player Section */}
        <div className="bg-black aspect-video w-full rounded-lg mb-6 overflow-hidden relative">
          <iframe
            src={stream.embedUrl}
            title={`Stream for ${match.title} - ${sourceId} - Stream ${stream.streamNo}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default StreamViewPage;
