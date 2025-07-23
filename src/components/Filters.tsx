// src/components/Filters.tsx
import React from 'react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  location,
  setLocation,
}) => {
  return (
    <aside className="bg-white p-4 rounded-lg shadow-md w-full md:w-64 mb-6 md:mb-0">
      <h3 className="text-lg font-semibold mb-4 text-[#0D3547]">Filters</h3>

      {/* ✅ Search input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#0D3547] mb-1">Search</label>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#0D3547] mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
        >
          <option value="">All Categories</option>
          <option value="Living Room">Living Room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Office">Office</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#0D3547] mb-1">Price Range</label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
        >
          <option value="">Any</option>
          <option value="0-50000">Below 50,000 RWF</option>
          <option value="50000-150000">50,000 - 150,000 RWF</option>
          <option value="150000+">Above 150,000 RWF</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0D3547] mb-1">Location</label>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
        />
      </div>
    </aside>
  );
};

export default Filters;
