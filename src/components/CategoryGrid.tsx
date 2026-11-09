import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

const categories = [
  { title: 'Living Room', note: 'Sofas, tables & statement pieces', imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85' },
  { title: 'Bedroom', note: 'Restful spaces, made personal', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85' },
  { title: 'Dining', note: 'Gather around something beautiful', imageUrl: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=900&q=85' },
  { title: 'Office', note: 'Work comfortably and beautifully', imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85' },
];

export default function CategoryGrid() {
  return (
    <section className="category-section">
      <div className="section-heading">
        <div><span className="eyebrow eyebrow--dark">CURATED FOR EVERY CORNER</span><h2>Spaces that feel like <em>you.</em></h2></div>
        <Link to="/all-products" className="text-link">Explore all products <ArrowUpRightIcon className="h-4 w-4" /></Link>
      </div>
      <div className="category-grid">
        {categories.map((category, index) => (
          <Link to={`/all-products?category=${encodeURIComponent(category.title)}`} key={category.title} className={`category-tile category-tile--${index + 1}`}>
            <img src={category.imageUrl} alt={category.title} />
            <div className="category-tile__overlay" />
            <div className="category-tile__copy"><span>0{index + 1} / COLLECTION</span><h3>{category.title}</h3><p>{category.note}</p></div>
            <span className="category-tile__arrow"><ArrowUpRightIcon className="h-5 w-5" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}