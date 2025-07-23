import { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [user] = useState({
    isLoggedIn: false,
    role: 'buyer',
    name: 'John Doe',
    cartItems: 3,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getNavLinks = () => {
    const baseLinks = [
      { name: 'Home', href: '/' },
      { name: 'Browse Products', href: '/BrowseProducts' },
    ];

    if (user.role === 'seller') {
      return [...baseLinks, { name: 'Seller Dashboard', href: '/seller' }];
    }

    if (user.role === 'admin') {
      return [...baseLinks, { name: 'Admin Dashboard', href: '/admin' }];
    }

    return [...baseLinks, { name: 'Order', href: '/track-order' }];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#0F766E]">HomeLynk</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="border-transparent text-[#4B5563] hover:border-[#D4AF37] hover:text-[#0F766E] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
  <div className="max-w-lg w-full lg:max-w-xl hidden md:block">
    <label htmlFor="search" className="sr-only">
      Search
    </label>

    <div className="relative flex">
      {/* Category Select Container */}
      <div className="relative">
        <select
          id="category"
          name="category"
          defaultValue="all"
          className="block w-44 pl-4 pr-10 py-2 border border-[#0F766E] rounded-l-md bg-white text-[#0F766E] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#0F766E] hover:border-[#D4AF37] sm:text-sm transition-colors"
        >
          <option value="all">All Categories</option>
          <option value="living-room">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="office">Office</option>
          <option value="outdoor">Outdoor</option>
          <option value="custom-made">Custom Made</option>
        </select>

        {/* Custom Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-4 w-4 text-[#0F766E]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-[#0F766E]" />
        </div>
        <input
          id="search"
          name="search"
          placeholder="Search products..."
          type="search"
          className="block w-full pl-10 pr-4 py-2 border-t border-b border-r border-[#0F766E] rounded-r-md leading-5 bg-white text-[#0F766E] placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#0F766E] hover:border-[#D4AF37] sm:text-sm transition-colors"
        />
      </div>
    </div>
  </div>
</div>




          {/* Right - Cart + Auth */}
          <div className="flex items-center">
            {/* Cart */}
            <Link to="/cart" className="flex-shrink-0 ml-4 relative">
  <button className="bg-white rounded-full p-1 text-[#0D3547] hover:text-[#8B5E3C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5E3C]">
    <span className="sr-only">Cart</span>
    <ShoppingCartIcon className="h-6 w-6" />
    {user.cartItems > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#8B5E3C] rounded-full">
        {user.cartItems}
      </span>
    )}
  </button>
</Link>
            {/* Auth Buttons */}
            {user.isLoggedIn ? (
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div className="ml-3 relative">
                  <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F766E]">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-[#FAF3E0] flex items-center justify-center text-[#0F766E]">
                      <UserIcon className="h-5 w-5" />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:ml-6 md:flex md:space-x-4">
              <a
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#0F766E] bg-white hover:bg-[#FAF3E0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
              >
                Login
              </a>
            </div>
            
            )}

            {/* Mobile Menu Toggle */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#0F766E] hover:text-[#D4AF37] hover:bg-[#FAF3E0] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0F766E]"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
        }`}
      >
        <div className="pt-2 pb-3 space-y-1 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="border-transparent text-[#4B5563] hover:bg-[#FAF3E0] hover:border-[#D4AF37] hover:text-[#0F766E] block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              {link.name}
            </a>
          ))}

          {/* Mobile Search */}
          <div className="px-4 py-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-[#4B5563]" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-[#0F766E] rounded-md leading-5 bg-white placeholder-[#4B5563] focus:outline-none focus:ring-1 focus:ring-[#0F766E] focus:border-[#0F766E] sm:text-sm"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </div>

          {/* Mobile Auth */}
          {user.isLoggedIn ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#FAF3E0] flex items-center justify-center text-[#0F766E]">
                    <UserIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-[#111827]">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-[#4B5563] capitalize">
                    {user.role}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-2 space-y-2">
              <a
                href="/login"
                className="w-full flex items-center justify-center px-4 py-2 border border-[#0F766E] text-base font-medium rounded-md text-[#0F766E] bg-white hover:bg-[#FAF3E0] transition"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0F766E] hover:bg-[#0d5e58] transition"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
