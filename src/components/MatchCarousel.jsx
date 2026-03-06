import React, { useRef } from 'react';
import MatchCard from './MatchCard';

const MatchCarousel = ({ title, matches }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll(-300)} // Scroll left by 300px
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-slate-100 z-10 hidden lg:block"
          aria-label="Scroll left"
        >
          &lt;
        </button>
        <button
          onClick={() => scroll(300)} // Scroll right by 300px
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-slate-100 z-10 hidden lg:block"
          aria-label="Scroll right"
        >
          &gt;
        </button>

        {/* Matches Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-4 p-2 -m-2" // p-2 -m-2 for scrollbar visibility and padding
          style={{ scrollBehavior: 'smooth' }}
        >
          {matches.length > 0 ? (
            matches.map((match) => (
              <div key={match.id} className="min-w-[280px] sm:min-w-[300px]"> {/* Fixed width for cards */}
                <MatchCard match={match} />
              </div>
            ))
          ) : (
            <p className="text-slate-600 text-center w-full">No matches available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MatchCarousel;
