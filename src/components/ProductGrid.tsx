// src/components/ProductGrid.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';
import CategoryGrid from './CategoryGrid';

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

// Helper to generate a random discount percentage
const getRandomDiscount = () => {
  const discounts = [-5, -10, -13, -7, -15, -8];
  return discounts[Math.floor(Math.random() * discounts.length)];
};

const ProductGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-10 relative">
      {/* All Products Arrow Button */}
      <div className="flex justify-end mb-2">
        <Link to="/all-products" className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D3547] text-white rounded-lg shadow hover:bg-[#8B5E3C] transition font-medium">
          View All Products
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>
      {/* New Arrivals */}
      <div className="bg-gradient-to-br from-[#FAF3E0]/60 to-white/60 rounded-3xl shadow-md p-5 md:p-8 lg:p-10 transition-all duration-500 backdrop-blur-md bg-white/60 border border-white/30">
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h2 className="text-3xl font-extrabold text-[#0D3547] tracking-tight flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-[#8B5E3C] rounded-full mr-2 animate-pulse"></span>
            New Arrivals
          </h2>
          <Link to="/all-products" className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D3547] text-white rounded-lg shadow hover:bg-[#8B5E3C] transition font-medium">
            View All <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
        <p className="text-[#0D3547]/60 mb-5 text-base">Freshly added products for your home and office</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-8 lg:gap-10 animate-fade-in">
          {newArrivals.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="hover:no-underline">
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

      {/* Divider */}
      <div className="w-full h-2 flex items-center justify-center my-3 lg:my-5">
        <span className="block w-2 h-2 bg-[#8B5E3C] rounded-full animate-bounce mx-1"></span>
        <span className="block w-32 h-1 bg-gradient-to-r from-transparent via-[#8B5E3C]/30 to-transparent rounded-full"></span>
        <span className="block w-2 h-2 bg-[#8B5E3C] rounded-full animate-bounce mx-1"></span>
      </div>

      {/* Featured Products */}
      <div className="bg-gradient-to-br from-[#F0F4F8]/60 to-white/60 rounded-3xl shadow-md p-5 md:p-8 lg:p-10 transition-all duration-500 backdrop-blur-md bg-white/60 border border-white/30">
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h2 className="text-3xl font-extrabold text-[#0D3547] tracking-tight flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-[#0D3547] rounded-full mr-2 animate-pulse"></span>
            Featured Products
          </h2>
          <Link to="/all-products" className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D3547] text-white rounded-lg shadow hover:bg-[#8B5E3C] transition font-medium">
            View All <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
        <p className="text-[#0D3547]/60 mb-5 text-base">Handpicked highlights for you</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-8 lg:gap-10 animate-fade-in">
          {featuredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="hover:no-underline">
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

      {/* Divider */}
      <div className="w-full h-2 flex items-center justify-center my-3 lg:my-5">
        <span className="block w-2 h-2 bg-[#0D3547] rounded-full animate-bounce mx-1"></span>
        <span className="block w-32 h-1 bg-gradient-to-r from-transparent via-[#0D3547]/20 to-transparent rounded-full"></span>
        <span className="block w-2 h-2 bg-[#0D3547] rounded-full animate-bounce mx-1"></span>
      </div>

      {/* Discounted Products */}
      <div className="bg-gradient-to-br from-[#FFF7ED]/60 to-white/60 rounded-3xl shadow-md p-5 md:p-8 lg:p-10 transition-all duration-500 backdrop-blur-md bg-white/60 border border-white/30">
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h2 className="text-3xl font-extrabold text-[#8B5E3C] tracking-tight flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-[#0D3547] rounded-full mr-2 animate-pulse"></span>
            Discounted Products
          </h2>
          <Link to="/all-products" className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D3547] text-white rounded-lg shadow hover:bg-[#8B5E3C] transition font-medium">
            View All <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
        <p className="text-[#0D3547]/60 mb-5 text-base">Save more with these special offers</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-8 lg:gap-10 animate-fade-in">
          {discountedProducts.map(product => (
            <div key={product.id} className="relative">
              {/* Discount badge */}
              <span className="absolute top-3 left-3 z-10 bg-[#8B5E3C] text-white text-xs font-bold rounded-full px-3 py-1 shadow-lg select-none">
                {getRandomDiscount()}%
              </span>
              <Link to={`/products/${product.id}`} className="hover:no-underline block">
                <ProductCard
                  imageUrl={product.imageUrl}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
