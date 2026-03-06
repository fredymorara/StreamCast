import React from 'react';

const StreamSelector = ({ sources, onStreamSelect, activeStreamId }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-slate-800">Available Streams</h3>
      {Object.keys(sources).length === 0 && (
        <p className="text-slate-600">No streams available for this match.</p>
      )}
      {Object.keys(sources).map(sourceName => (
        <div key={sourceName} className="mb-4">
          <h4 className="text-lg font-semibold text-slate-700 mb-2">Source {sourceName}</h4>
          {sources[sourceName].length === 0 ? (
            <p className="text-slate-600 text-sm pl-4">No streams from this source.</p>
          ) : (
            <ul>
              {sources[sourceName].map(stream => (
                <li
                  key={stream.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                    activeStreamId === stream.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                  onClick={() => onStreamSelect({ ...stream, sourceId: sourceName })}
                >
                  <span>
                    Stream {stream.streamNo} - {stream.lang} {stream.hd && <span className="ml-1 px-2 py-0.5 rounded-full bg-green-500 text-xs font-bold">HD</span>}
                  </span>
                  {activeStreamId === stream.id && <span className="ml-2 text-sm">✓</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default StreamSelector;
