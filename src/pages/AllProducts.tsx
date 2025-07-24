import React, { useState } from 'react';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

// Example product data (replace with real data or props/fetch)
const allProducts = [
    {
        id: 1,
        name: 'Modern Wooden Coffee Table',
        description: 'Solid oak wood, modern look.',
        price: 120000,
        category: 'Living Room',
        location: 'Kigali',
        imageUrl: 'https://images.unsplash.com/photo-1627201328438-8751f597f9f3?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 2,
        name: 'Velvet Armchair',
        description: 'Soft velvet, stylish design.',
        price: 95000,
        category: 'Living Room',
        location: 'Kigali',
        imageUrl: 'https://images.unsplash.com/photo-1567538096631-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
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
    // ...add more products as needed
    {
        id: 4,
        name: 'Minimalist Dining Table',
        description: 'Sleek table for modern dining rooms.',
        price: 210000,
        category: 'Dining',
        location: 'Kigali',
        imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    },
    {
        id: 5,
        name: 'Luxury King Bed',
        description: 'Spacious and comfortable king size bed.',
        price: 350000,
        category: 'Bedroom',
        location: 'Huye',
        imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 6,
        name: 'Study Desk',
        description: 'Compact desk for study or work.',
        price: 85000,
        category: 'Office',
        location: 'Musanze',
        imageUrl: 'https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 7,
        name: 'Lounge Sofa',
        description: 'Cozy fabric sofa for your living room.',
        price: 220000,
        category: 'Living Room',
        location: 'Huye',
        imageUrl: 'https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 8,
        name: 'Bookshelf',
        description: 'Spacious wooden bookshelf.',
        price: 60000,
        category: 'Office',
        location: 'Kigali',
        imageUrl: 'https://images.unsplash.com/photo-1583845112203-4543754ea4b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=765&q=80',
    },
    {
        id: 9,
        name: 'Outdoor Patio Set',
        description: 'Weather-resistant outdoor furniture.',
        price: 180000,
        category: 'Outdoor',
        location: 'Rwamagana',
        imageUrl: 'https://images.unsplash.com/photo-1618106564892-b5202ed366f3?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 10,
        name: 'Custom Coffee Table',
        description: 'Handmade custom coffee table.',
        price: 140000,
        category: 'Custom Made',
        location: 'Kigali',
        imageUrl: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 11,
        name: 'Vintage Armchair',
        description: 'Classic style with a modern twist.',
        price: 60000,
        category: 'Living Room',
        location: 'Rwamagana',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop',
    },
    {
        id: 12,
        name: 'Executive Office Desk',
        description: 'Elegant desk for modern offices.',
        price: 180000,
        category: 'Office',
        location: 'Kigali',
        imageUrl: 'https://images.unsplash.com/photo-1558645574-1b4b00e2c74b?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 13,
        name: 'Dining Chair Set',
        description: 'Set of 4 comfortable dining chairs.',
        price: 90000,
        category: 'Dining',
        location: 'Huye',
        imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 14,
        name: 'Bedside Table',
        description: 'Minimalist bedside table.',
        price: 40000,
        category: 'Bedroom',
        location: 'Kigali',
        imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&auto=format&fit=crop&q=60',
    },
    {
        id: 15,
        name: 'Garden Bench',
        description: 'Sturdy bench for your garden.',
        price: 70000,
        category: 'Outdoor',
        location: 'Musanze',
        imageUrl: 'https://images.unsplash.com/photo-1618106564892-b5202ed366f3?w=600&auto=format&fit=crop&q=60',
    },
];

const AllProducts: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [location, setLocation] = useState('');

    // Filtering logic
    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || product.category === category;
        const matchesLocation = !location || product.location.toLowerCase().includes(location.toLowerCase());
        let matchesPrice = true;
        if (priceRange === '0-50000') matchesPrice = product.price < 50000;
        else if (priceRange === '50000-150000') matchesPrice = product.price >= 50000 && product.price <= 150000;
        else if (priceRange === '150000+') matchesPrice = product.price > 150000;
        return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="md:w-1/4 w-full md:sticky md:top-28 h-fit">
                    <Filters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        category={category}
                        setCategory={setCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        location={location}
                        setLocation={setLocation}
                    />
                </div>
                {/* Product Grid */}
                <div className="flex-1">
                    <h1 className="text-3xl font-extrabold text-[#0D3547] mb-6 tracking-tight">All Products</h1>
                    {filteredProducts.length === 0 ? (
                        <div className="text-center text-[#0D3547]/60 py-16 text-lg">No products found matching your filters.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate-fade-in">
                            {filteredProducts.map(product => (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProducts; 