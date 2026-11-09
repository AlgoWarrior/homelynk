import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [query,setQuery]=useState('');
  const [menuOpen,setMenuOpen]=useState(false);
  const navigate=useNavigate();
  const search=(event:React.FormEvent)=>{event.preventDefault();navigate(`/all-products?search=${encodeURIComponent(query.trim())}`);setMenuOpen(false);};
  return <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-3">
    <nav className="mx-auto max-w-[1320px] bg-[#fbfaf7]/95 backdrop-blur-xl border border-white/70 shadow-[0_8px_35px_rgba(20,45,48,.10)] rounded-sm">
      <div className="h-[76px] px-5 md:px-8 flex items-center justify-between gap-5">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/HOMELYNK .png" alt="HomeLynk" className="h-12 w-auto max-w-[145px] object-contain" onError={e=>{(e.currentTarget as HTMLImageElement).src='/HOMELYNK .jpg';}}/>
          <span className="hidden xl:block text-[9px] tracking-[.2em] text-[#9b6749] border-l border-[#d9d1c6] pl-3">FURNITURE & LIVING</span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-[12px] font-semibold text-[#31515a]">
          <Link to="/" className="hover:text-[#9b6749]">Home</Link>
          <Link to="/all-products" className="hover:text-[#9b6749]">Shop all</Link>
          <Link to="/all-products?category=Living%20Room" className="hover:text-[#9b6749]">Living room</Link>
          <Link to="/all-products?category=Bedroom" className="hover:text-[#9b6749]">Bedroom</Link>
          <Link to="/track-order" className="hover:text-[#9b6749]">Track order</Link>
        </div>
        <form onSubmit={search} className="hidden md:flex flex-1 max-w-[300px] items-center border-b border-[#b9c2bd] py-2 gap-2">
          <MagnifyingGlassIcon className="w-4 h-4 text-[#9b6749]"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the collection" className="w-full bg-transparent outline-none text-xs text-[#173943] placeholder:text-[#899492]"/>
        </form>
        <div className="flex items-center gap-4">
          <Link to="/cart" aria-label="Shopping cart" className="relative text-[#173943] hover:text-[#9b6749]"><ShoppingBagIcon className="w-5 h-5"/><span className="absolute -top-2 -right-2 bg-[#9b6749] text-white text-[9px] rounded-full w-4 h-4 grid place-items-center">2</span></Link>
          <Link to="/login" className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-[#173943] hover:text-[#9b6749]"><UserCircleIcon className="w-5 h-5"/> Sign in</Link>
          <button onClick={()=>setMenuOpen(v=>!v)} className="md:hidden text-[#173943]" aria-label="Toggle navigation">{menuOpen?<XMarkIcon className="w-6 h-6"/>:<Bars3Icon className="w-6 h-6"/>}</button>
        </div>
      </div>
      {menuOpen&&<div className="md:hidden border-t border-[#e8e4dc] p-5 space-y-4">
        <form onSubmit={search} className="flex gap-2 border border-[#dedbd3] p-2"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." className="flex-1 min-w-0 outline-none text-sm"/><button aria-label="Search"><MagnifyingGlassIcon className="w-5 h-5"/></button></form>
        {[['Home','/'],['Shop all','/all-products'],['Living room','/all-products?category=Living%20Room'],['Bedroom','/all-products?category=Bedroom'],['Track order','/track-order'],['Sign in','/login']].map(([label,to])=><Link key={to} to={to} onClick={()=>setMenuOpen(false)} className="block text-sm font-semibold text-[#173943]">{label}</Link>)}
      </div>}
    </nav>
  </header>;
}