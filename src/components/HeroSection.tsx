import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ArrowRightIcon, CheckBadgeIcon, TruckIcon, SparklesIcon } from '@heroicons/react/24/outline';

const categories = [
  { name: 'Living room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=85', query: 'Living Room' },
  { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=85', query: 'Bedroom' },
  { name: 'Dining', image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=500&q=85', query: 'Dining' },
  { name: 'Office', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=85', query: 'Office' },
  { name: 'Outdoor', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=500&q=85', query: 'Outdoor' },
];

export default function HeroSection() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/all-products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <section className="home-hero">
      <div className="home-hero__image" />
      <div className="home-hero__shade" />
      <div className="home-hero__content">
        <span className="eyebrow"><SparklesIcon className="h-4 w-4" /> MADE FOR THE WAY YOU LIVE</span>
        <h1>Make room for<br /><em>better living.</em></h1>
        <p>Thoughtfully made furniture and home essentials, from Rwanda’s makers to your doorstep.</p>
        <form className="hero-search" onSubmit={submitSearch}>
          <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 shrink-0" />
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder="What are you looking for?" aria-label="Search products" />
          <button type="submit">Search <ArrowRightIcon className="h-4 w-4" /></button>
        </form>
        <div className="hero-trust">
          <span><CheckBadgeIcon /> Local makers</span>
          <span><TruckIcon /> Delivery across Rwanda</span>
        </div>
      </div>
      <div className="hero-categories-wrap">
        <div className="hero-categories-heading"><span>EXPLORE THE COLLECTION</span><span>Find your style</span></div>
        <div className="hero-categories">
          {categories.map(category => (
            <button key={category.name} onClick={() => navigate(`/all-products?category=${encodeURIComponent(category.query)}`)} className="hero-category">
              <img src={category.image} alt="" />
              <span>{category.name}</span><ArrowRightIcon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}