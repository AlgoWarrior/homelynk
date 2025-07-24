import { useState } from 'react';
import { MagnifyingGlassIcon, ChevronRightIcon, TagIcon } from '@heroicons/react/24/solid';

const categories = [
  { name: 'Living Room', img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=200&q=80' },
  { name: 'Bedroom', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=200&q=80' },
  { name: 'Dining', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80' },
  { name: 'Office', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Outdoor', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80' },
  { name: 'Decor', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80' },
  { name: 'Kids', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80' },
  { name: 'Storage', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
  { name: 'Lighting', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80' },
];

const HERO_IMAGE = 'https://plus.unsplash.com/premium_photo-1661780295073-98db12600af0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // new, bright, modern furniture scene

const HeroSection = () => {
  const [search, setSearch] = useState('');

  return (
    <section className="relative w-full bg-gray-100 overflow-hidden min-h-screen h-screen flex flex-col justify-center">
      {/* Hero Banner */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={HERO_IMAGE}
          alt="Hero banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        {/* Gradient overlay for readability (slightly darker for floating navbar) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-black/10 z-10" />
        {/* Content overlay */}
        <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 md:px-16 max-w-3xl mt-0">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0D3547] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
            Everything for your home, delivered fast
          </h1>
          {/* Search Bar */}
          <form className="w-full flex mt-2" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0D3547] text-gray-800 text-base shadow placeholder-gray-600"
              placeholder="Search for products, brands, or categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-r-full bg-[#ffd814] px-6 py-3 text-[#0D3547] font-bold hover:bg-[#f7ca00] transition-colors flex items-center text-base shadow drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-1" /> Search
            </button>
          </form>
          {/* CTA */}
          <button
            className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full bg-[#ffa41c] text-[#0D3547] font-bold text-base shadow drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[#ff9900] transition-colors"
            aria-label="Shop Today's Deals"
          >
            <TagIcon className="h-5 w-5" /> Shop Today's Deals <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Category Row */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16">
        <div className="bg-white rounded-xl shadow-lg py-4 px-2 flex items-center overflow-x-auto gap-6 scrollbar-thin scrollbar-thumb-[#8B5E3C]/40 scrollbar-track-transparent">
          {categories.map(cat => (
            <div key={cat.name} className="flex flex-col items-center min-w-[110px] cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-[#0D3547] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shadow">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="mt-2 text-xs font-semibold text-[#0D3547] group-hover:text-[#8B5E3C] text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;