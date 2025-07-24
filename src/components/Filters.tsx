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
  // Reset all filters
  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setPriceRange('');
    setLocation('');
  };

  // For now, Apply just closes the filter (if mobile) or does nothing (since filters are live)
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // Optionally trigger a callback or close a modal in mobile
  };

  return (
    <aside className="bg-gradient-to-br from-[#F0F4F8]/80 to-[#FAF3E0]/60 backdrop-blur rounded-2xl shadow-lg w-full md:w-64 mb-6 md:mb-0 border border-[#8B5E3C]/30">
      <form onSubmit={handleApply} className="flex flex-col gap-6 p-6">
        <h3 className="text-xl font-extrabold mb-2 text-[#8B5E3C] tracking-tight flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-[#8B5E3C] rounded-full"></span>
          Filters
        </h3>
        {/* Search input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#0D3547]">Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-[#8B5E3C]/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white"
          />
        </div>
        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#0D3547]">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-[#8B5E3C]/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white"
          >
            <option value="">All Categories</option>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Office">Office</option>
          </select>
        </div>
        {/* Price Range */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#0D3547]">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border border-[#8B5E3C]/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white"
          >
            <option value="">Any</option>
            <option value="0-50000">Below 50,000 RWF</option>
            <option value="50000-150000">50,000 - 150,000 RWF</option>
            <option value="150000+">Above 150,000 RWF</option>
          </select>
        </div>
        {/* Location */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#0D3547]">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-[#8B5E3C]/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white"
          />
        </div>
        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 px-4 py-2 rounded-lg border border-[#8B5E3C]/40 bg-white text-[#8B5E3C] font-semibold hover:bg-[#F5F7FA] transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-lg bg-[#8B5E3C] text-white font-semibold hover:bg-[#0D3547] transition shadow"
          >
            Apply
          </button>
        </div>
      </form>
    </aside>
  );
};

export default Filters;
