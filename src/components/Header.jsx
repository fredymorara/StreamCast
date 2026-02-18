import React from 'react';

const Header = () => {
  return (
    <header className="bg-emerald-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">SpaceStream</div>
        {/* Navigation items will go here */}
        <nav>
          {/* Placeholder for navigation links, filters, and search */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
