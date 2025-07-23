import React, { useState } from 'react';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const ManagementProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      name: 'Modern Wooden Coffee Table',
      price: 150000,
      stock: 12,
      category: 'Living Room'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1567538096631-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      name: 'Velvet Armchair',
      price: 95000,
      stock: 5,
      category: 'Living Room'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1583845112203-4543754ea4b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
      name: 'Industrial Bookshelf',
      price: 120000,
      stock: 8,
      category: 'Office'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      name: 'Minimalist Dining Table',
      price: 210000,
      stock: 3,
      category: 'Dining'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
      name: 'Luxury King Bed',
      price: 350000,
      stock: 7,
      category: 'Bedroom'
    }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0D3547]">Manage Products</h1>
          <p className="text-[#0D3547]/70">View and manage your product listings</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-[#0D3547]/50" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2 border border-[#0D3547]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#0D3547]/30 placeholder-[#0D3547]/40 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#0D3547]/10">
          <thead className="bg-[#0D3547]/5">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#0D3547] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#0D3547]/10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-[#0D3547]/5 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                        <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#0D3547]">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#0D3547]">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#0D3547]">RWF {product.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#0D3547] hover:text-[#8B5E3C] mr-4">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-[#0D3547] hover:text-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-[#0D3547]/70">
                  No products found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Button */}
      <div className="mt-6 flex justify-end">
        <button className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0D3547] hover:bg-[#0D3547]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5E3C] transition">
          Add New Product
        </button>
      </div>
    </div>
  );
};

export default ManagementProducts;