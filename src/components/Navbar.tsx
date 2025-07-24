import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [user] = useState({
    isLoggedIn: false,
    role: 'buyer',
    name: 'John Doe',
    cartItems: 3,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'dining', label: 'Dining Room' },
    { value: 'office', label: 'Office' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'decor', label: 'Home Decor' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery, 'in category:', selectedCategory);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg fixed left-8 right-8 top-8 z-50 shadow-2xl border-b border-gray-100 rounded-3xl px-4 md:px-8 pt-4 pb-2 mx-auto max-w-6xl">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-14 gap-2 md:gap-6 lg:gap-10">
          {/* Logo (hidden on mobile) */}
          <Link to="/" className="hidden md:flex items-center flex-shrink-0">
            <img
              src="/HOMELYNK .png"
              alt="HOMELYNK Logo"
              className="h-28 w-auto object-contain"
              onError={(e) => {
                // Fallback to .jpg if .png fails
                const target = e.target as HTMLImageElement;
                target.src = '/HOMELYNK.jpg';
              }}
            />
          </Link>

          {/* Desktop Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 md:mx-6 lg:mx-10">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 hover:border-[#8B5E3C]/50 focus-within:border-[#8B5E3C] focus-within:ring-2 focus-within:ring-[#8B5E3C]/20 transition-all h-9">
                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-transparent border-0 pl-3 pr-7 py-2 text-xs font-medium text-[#0D3547] focus:outline-none cursor-pointer"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="h-3.5 w-3.5 text-[#0D3547] absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
                {/* Divider */}
                <div className="h-5 w-px bg-gray-300"></div>
                {/* Search Input */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search for furniture, decor, and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-transparent border-0 text-[#0D3547] placeholder-gray-500 focus:outline-none text-xs"
                  />
                </div>
                {/* Search Button */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0D3547] text-white rounded-r-lg hover:bg-[#0D3547]/90 transition-colors font-medium text-xs"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Mobile Search Icon */}
          <button
            className="md:hidden p-2 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all"
            aria-label="Open search"
            onClick={() => setShowMobileSearch((v) => !v)}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {/* Right Side - Cart, Login, Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-1.5 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all group"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {user.cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B5E3C] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 shadow-lg">
                  {user.cartItems > 99 ? '99+' : user.cartItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Link>
            {/* Login/User Menu */}
            {user.isLoggedIn ? (
              <div className="relative">
                <button className="flex items-center space-x-2 p-1.5 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all">
                  <div className="w-7 h-7 bg-[#8B5E3C] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden sm:block font-medium text-xs">{user.name}</span>
                  <ChevronDownIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-3 py-1.5 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 font-medium transition-all shadow-sm hover:shadow-md text-xs"
              >
                <UserIcon className="h-3.5 w-3.5 mr-1" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-[#8B5E3C] focus-within:ring-2 focus-within:ring-[#8B5E3C]/20">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-0 text-[#0D3547] placeholder-gray-500 focus:outline-none text-sm rounded-l-lg"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="px-3 py-3 text-[#0D3547] border-l border-gray-200"
              >
                <FunnelIcon className="h-5 w-5" />
              </button>
              <button
                type="submit"
                className="px-4 py-3 bg-[#0D3547] text-white rounded-r-lg hover:bg-[#0D3547]/90 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Category Filter */}
            {showCategoryDropdown && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === category.value ? 'text-[#8B5E3C] font-medium' : 'text-[#0D3547]'
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Search Bar (overlay) */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24" onClick={() => setShowMobileSearch(false)}>
          <form
            className="bg-white rounded-xl shadow-lg flex items-center w-11/12 max-w-md p-2 gap-2"
            onSubmit={e => { e.preventDefault(); setShowMobileSearch(false); }}
            onClick={e => e.stopPropagation()}
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-[#0D3547]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 px-2 py-2 text-[#0D3547] bg-transparent focus:outline-none"
              autoFocus
            />
            <button type="submit" className="px-3 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#8B5E3C] transition text-xs font-medium">
              Search
            </button>
            <button type="button" className="p-2 text-[#0D3547] hover:text-[#8B5E3C]" onClick={() => setShowMobileSearch(false)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/all-products"
              className="block px-3 py-2 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              to="/BrowseProducts"
              className="block px-3 py-2 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Products
            </Link>
            <Link
              to="/track-order"
              className="block px-3 py-2 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Track Order
            </Link>
            {!user.isLoggedIn && (
              <Link
                to="/login"
                className="block px-3 py-2 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-50 rounded-lg transition-all font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
