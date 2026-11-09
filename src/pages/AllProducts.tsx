import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';

const products=[
{id:1,name:'Oakline Coffee Table',description:'Solid timber, clean architectural lines.',price:120000,category:'Living Room',location:'Kigali',imageUrl:'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85'},
{id:2,name:'Mira Lounge Chair',description:'A soft silhouette with a warm finish.',price:95000,category:'Living Room',location:'Kigali',imageUrl:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85'},
{id:3,name:'Forma Work Chair',description:'Everyday comfort for focused work.',price:75000,category:'Office',location:'Musanze',imageUrl:'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?auto=format&fit=crop&w=900&q=85'},
{id:4,name:'Atelier Dining Table',description:'A welcoming centrepiece for gathering.',price:210000,category:'Dining',location:'Kigali',imageUrl:'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85'},
{id:5,name:'Nia Platform Bed',description:'Quiet, minimal design for better rest.',price:350000,category:'Bedroom',location:'Huye',imageUrl:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85'},
{id:6,name:'Studio Writing Desk',description:'Compact workspace with generous storage.',price:85000,category:'Office',location:'Musanze',imageUrl:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85'},
{id:7,name:'Luma Three-Seater',description:'Relaxed proportions and textured upholstery.',price:220000,category:'Living Room',location:'Huye',imageUrl:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85'},
{id:8,name:'Tala Bookshelf',description:'Open shelving for the things you love.',price:60000,category:'Office',location:'Kigali',imageUrl:'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=85'},
{id:9,name:'Outdoor Lounge Set',description:'Bring comfort to your outdoor space.',price:180000,category:'Outdoor',location:'Rwamagana',imageUrl:'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=85'},
{id:10,name:'Handcrafted Accent Table',description:'A distinctive piece by a local maker.',price:140000,category:'Living Room',location:'Kigali',imageUrl:'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85'},
{id:11,name:'Tamu Accent Chair',description:'A timeless chair with a sculpted frame.',price:60000,category:'Living Room',location:'Rwamagana',imageUrl:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85'},
{id:12,name:'Executive Desk',description:'A generous desk for the modern workspace.',price:180000,category:'Office',location:'Kigali',imageUrl:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85'}
];
const money=(value:number)=>'RWF '+value.toLocaleString('en-US');
export default function AllProducts(){
 const [params]=useSearchParams();
 const [search,setSearch]=useState(params.get('search')||'');
 const [category,setCategory]=useState(params.get('category')||'');
 const [location,setLocation]=useState('');
 const [price,setPrice]=useState('');
 const filtered=useMemo(()=>products.filter(p=>(!search||`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(search.toLowerCase()))&&(!category||p.category.toLowerCase()===category.toLowerCase())&&(!location||p.location===location)&&(!price||(price==='under100'&&p.price<100000)||(price==='100to200'&&p.price>=100000&&p.price<=200000)||(price==='over200'&&p.price>200000))),[search,category,location,price]);
 const reset=()=>{setSearch('');setCategory('');setLocation('');setPrice('');};
 return <main className="max-w-[1280px] mx-auto px-5 md:px-8 pt-32 pb-20">
  <div className="mb-10 border-b border-[#e5e1d8] pb-8"><span className="eyebrow eyebrow--dark">DISCOVER YOUR NEXT FAVOURITE</span><h1 className="font-serif text-5xl md:text-6xl text-[#173943] mt-3">The collection<span className="text-[#9b6749]">.</span></h1><p className="text-sm text-[#788381] mt-3">Furniture and home essentials from makers across Rwanda.</p></div>
  <div className="grid grid-cols-1 lg:grid-cols-[245px_1fr] gap-9">
   <aside className="bg-white border border-[#e9e6df] p-5 h-fit">
    <div className="flex items-center justify-between mb-5"><h2 className="font-bold text-[#173943] flex gap-2 items-center"><AdjustmentsHorizontalIcon className="w-4 h-4"/> Refine</h2><button onClick={reset} className="text-[10px] text-[#9b6749] font-bold">Clear all</button></div>
    <label className="block text-[10px] uppercase tracking-widest text-[#778481] font-bold mb-2">Search</label><div className="flex items-center border border-[#e5e1d8] px-3 mb-5"><MagnifyingGlassIcon className="w-4 h-4 text-[#9b6749]"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a piece..." className="w-full min-w-0 p-3 text-xs outline-none"/></div>
    <label className="block text-[10px] uppercase tracking-widest text-[#778481] font-bold mb-2">Category</label><select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border border-[#e5e1d8] p-3 text-xs mb-5 bg-white"><option value="">All categories</option>{['Living Room','Bedroom','Dining','Office','Outdoor'].map(c=><option key={c}>{c}</option>)}</select>
    <label className="block text-[10px] uppercase tracking-widest text-[#778481] font-bold mb-2">Price range</label><select value={price} onChange={e=>setPrice(e.target.value)} className="w-full border border-[#e5e1d8] p-3 text-xs mb-5 bg-white"><option value="">Any price</option><option value="under100">Under RWF 100,000</option><option value="100to200">RWF 100,000 – 200,000</option><option value="over200">Above RWF 200,000</option></select>
    <label className="block text-[10px] uppercase tracking-widest text-[#778481] font-bold mb-2">Location</label><select value={location} onChange={e=>setLocation(e.target.value)} className="w-full border border-[#e5e1d8] p-3 text-xs bg-white"><option value="">All Rwanda</option>{['Kigali','Musanze','Huye','Rwamagana'].map(c=><option key={c}>{c}</option>)}</select>
   </aside>
   <section><div className="flex justify-between items-center mb-5"><p className="text-xs text-[#778481]"><strong className="text-[#173943]">{filtered.length}</strong> pieces found</p><span className="text-[10px] tracking-widest text-[#9b6749] font-bold">HOMELYNK / SHOP</span></div>
    {filtered.length===0?<div className="text-center py-20 bg-white border border-[#e9e6df]"><p className="font-serif text-2xl text-[#173943]">Nothing found just yet.</p><p className="text-sm text-[#778481] mt-2">Try another search or clear your filters.</p><button onClick={reset} className="mt-5 text-xs font-bold text-[#9b6749]">Clear filters <XMarkIcon className="inline w-4 h-4"/></button></div>:<div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">{filtered.map(p=><Link key={p.id} to={`/products/${p.id}`}><ProductCard imageUrl={p.imageUrl} name={p.name} description={p.description} price={p.price}/><span className="sr-only">{p.category} in {p.location}</span></Link>)}</div>}
   </section>
  </div>
 </main>;
}