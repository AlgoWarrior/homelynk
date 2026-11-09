import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';

const items=[
{id:1,name:'Oakline Coffee Table',description:'Solid timber, clean architectural lines.',price:120000,imageUrl:'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85'},
{id:2,name:'Mira Lounge Chair',description:'A soft silhouette with a warm finish.',price:95000,imageUrl:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85'},
{id:3,name:'Forma Work Chair',description:'Everyday comfort for focused work.',price:75000,imageUrl:'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?auto=format&fit=crop&w=900&q=85'},
{id:4,name:'Atelier Dining Table',description:'A welcoming centrepiece for gathering.',price:210000,imageUrl:'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85'},
{id:5,name:'Nia Platform Bed',description:'Quiet, minimal design for better rest.',price:350000,imageUrl:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85'},
{id:6,name:'Studio Writing Desk',description:'Compact workspace with generous storage.',price:85000,imageUrl:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85'},
{id:7,name:'Luma Three-Seater',description:'Relaxed proportions and textured upholstery.',price:220000,imageUrl:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85'},
{id:8,name:'Tala Bookshelf',description:'Open shelving for the things you love.',price:60000,imageUrl:'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=85'}
];
export default function ProductGrid(){
 return <section className="max-w-[1180px] mx-auto px-5 md:px-6 py-16 md:py-24">
  <div className="flex flex-wrap justify-between items-end gap-5 mb-8"><div><span className="eyebrow eyebrow--dark">THE HOMELYNK EDIT</span><h2 className="font-serif text-4xl md:text-5xl text-[#173943] mt-3">Pieces worth <em className="text-[#9b6749]">coming home to.</em></h2><p className="text-sm text-[#788381] mt-3">A considered selection from makers and furniture studios across Rwanda.</p></div><Link to="/all-products" className="text-link">View the collection <ArrowUpRightIcon className="w-4 h-4"/></Link></div>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">{items.map(item=><Link to={`/products/${item.id}`} key={item.id}><ProductCard {...item}/></Link>)}</div>
  <div className="mt-16 bg-[#173943] text-white px-7 py-10 md:px-14 md:py-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
   <div><span className="text-[9px] tracking-[.2em] text-[#d9b39b] font-bold">MADE WITH CARE, FOUND HERE</span><h3 className="font-serif text-3xl md:text-4xl mt-3">Your space. Your story.</h3><p className="text-sm text-white/65 mt-2 max-w-lg">Discover pieces made to last and makers who put care into every detail.</p></div>
   <Link to="/all-products" className="bg-[#d2ad94] text-[#173943] px-6 py-3 text-xs font-bold hover:bg-white transition">Explore HomeLynk <ArrowUpRightIcon className="inline w-4 h-4 ml-2"/></Link>
  </div>
 </section>;
}