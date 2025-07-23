// src/components/ProductGrid.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const newArrivals = [
  {
    id: 1,
    name: 'Modern Wooden Coffee Table',
    description: 'Solid oak wood, modern look.',
    price: 120000,
    category: 'Living Room',
    location: 'Kigali',
    imageUrl: 'https://images.unsplash.com/photo-1627201328438-8751f597f9f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8',
  },
  {
    id: 2,
    name: 'Modern Wooden Coffee Table',
    description: 'Solid oak wood, modern look.',
    price: 120000,
    category: 'Living Room',
    location: 'Kigali',
    imageUrl: 'https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Office Chair',
    description: 'Comfortable ergonomic chair.',
    price: 75000,
    category: 'Office',
    location: 'Musanze',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop',
  },
];

const featuredProducts = [
  {
    id: 4,
    name: 'Executive Office Desk',
    description: 'Elegant desk for modern offices.',
    price: 180000,
    category: 'Office',
    location: 'Kigali',
    imageUrl: 'https://images.unsplash.com/photo-1558645574-1b4b00e2c74b?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    name: 'Lounge Sofa',
    description: 'Cozy fabric sofa for your living room.',
    price: 220000,
    category: 'Living Room',
    location: 'Huye',
    imageUrl: 'https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 6,
    name: 'Vintage Armchair - 20% Off',
    description: 'Classic style with discount.',
    price: 60000,
    category: 'Living Room',
    location: 'Rwamagana',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop',
  },
];

const discountedProducts = [
  {
    id: 7,
    name: 'Vintage Armchair - 20% Off',
    description: 'Classic style with discount.',
    price: 60000,
    category: 'Living Room',
    location: 'Rwamagana',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Study Desk - 15% Off',
    description: 'Compact desk for study.',
    price: 85000,
    category: 'Office',
    location: 'Musanze',
    imageUrl: 'https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 9,
    name: 'Lounge Sofa',
    description: 'Cozy fabric sofa for your living room.',
    price: 220000,
    category: 'Living Room',
    location: 'Huye',
    imageUrl: 'https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600&auto=format&fit=crop&q=60',
  }
];

const ProductGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* ✅ New Arrivals */}
      <div>
        <h2 className="text-2xl font-bold text-[#0D3547] mb-4">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {newArrivals.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard
                imageUrl={product.imageUrl}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ Featured Products */}
      <div>
        <h2 className="text-2xl font-bold text-[#0D3547] mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard
                imageUrl={product.imageUrl}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ Discounted Products */}
      <div>
        <h2 className="text-2xl font-bold text-[#0D3547] mb-4">Discounted Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {discountedProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard
                imageUrl={product.imageUrl}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
