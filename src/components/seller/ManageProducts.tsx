import React, { useState } from 'react';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  location?: string;
}

const CATEGORY_OPTIONS = [
  'Living Room',
  'Bedroom',
  'Dining',
  'Office',
  'Outdoor',
  'Custom Made',
  'Decor',
  'Kids',
  'Storage',
  'Lighting',
];

const ManageProducts: React.FC = () => {
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    location: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts([
      ...products,
      {
        id: products.length + 1,
        image: imagePreview || 'https://via.placeholder.com/400x300?text=No+Image',
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: 1,
        category: newProduct.category,
        location: newProduct.location,
      },
    ]);
    setShowAddModal(false);
    setNewProduct({ name: '', description: '', price: '', category: '', image: '', location: '' });
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            onSubmit={handleAddProduct}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in flex flex-col gap-6"
          >
            <button
              className="absolute top-4 right-4 text-[#0D3547] hover:text-[#8B5E3C] p-2 rounded-full transition"
              onClick={() => setShowAddModal(false)}
              type="button"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-[#0D3547] mb-2">Add New Product</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-3">
                <label className="text-sm font-medium text-[#0D3547]">Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white"
                />
                <label className="text-sm font-medium text-[#0D3547]">Description</label>
                <textarea
                  required
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white min-h-[60px]"
                />
                <label className="text-sm font-medium text-[#0D3547]">Price (RWF)</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={newProduct.price}
                  onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white"
                />
                <label className="text-sm font-medium text-[#0D3547]">Category</label>
                <select
                  required
                  value={newProduct.category}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white"
                >
                  <option value="">Select Category</option>
                  {CATEGORY_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <label className="text-sm font-medium text-[#0D3547]">Location</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    value={newProduct.location}
                    readOnly
                    placeholder="Select on Map"
                    className="border border-gray-200 rounded-lg p-2 flex-1 bg-gray-100 cursor-not-allowed"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 rounded-lg bg-[#0D3547] text-white font-semibold hover:bg-[#8B5E3C] transition shadow text-xs"
                    onClick={() => setShowMapModal(true)}
                  >
                    Select on Map
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <label className="text-sm font-medium text-[#0D3547]">Image</label>
                <div className="w-32 h-32 rounded-xl bg-gray-100 border-2 border-dashed border-[#8B5E3C]/40 flex items-center justify-center overflow-hidden mb-2">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#8B5E3C]/60 text-xs">No Image</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-xs text-[#0D3547] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#8B5E3C]/10 file:text-[#8B5E3C] hover:file:bg-[#8B5E3C]/20"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#0D3547] text-white font-semibold hover:bg-[#8B5E3C] transition shadow"
              >
                Add Product
              </button>
            </div>
          </form>
          {/* Map Modal (simulate with a simple input for now) */}
          {showMapModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-6 relative animate-fade-in flex flex-col gap-4">
                <button
                  className="absolute top-4 right-4 text-[#0D3547] hover:text-[#8B5E3C] p-2 rounded-full transition"
                  onClick={() => setShowMapModal(false)}
                  aria-label="Close"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <h3 className="text-lg font-bold text-[#0D3547] mb-2">Select Location</h3>
                <input
                  type="text"
                  placeholder="Enter location or coordinates..."
                  value={newProduct.location}
                  onChange={e => setNewProduct({ ...newProduct, location: e.target.value })}
                  className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] bg-white"
                />
                <button
                  className="px-4 py-2 rounded-lg bg-[#0D3547] text-white font-semibold hover:bg-[#8B5E3C] transition shadow mt-2"
                  onClick={() => setShowMapModal(false)}
                >
                  Save Location
                </button>
              </div>
            </div>
          )}
        </div>
      )}
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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
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
        <button
          className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0D3547] hover:bg-[#8B5E3C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5E3C] transition"
          onClick={() => setShowAddModal(true)}
        >
          <PlusIcon className="h-5 w-5" /> Add New Product
        </button>
      </div>
    </div>
  );
};

export default ManageProducts;