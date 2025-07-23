import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D3547] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src="public/HOME LYNK .png" alt="HomeLynk Logo" />
          <p className="text-sm text-[#E5E7EB]">
            HomeLynk — Your trusted marketplace for unique, high-quality furniture made by Rwandan artisans.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#8B5E3C]">Shop</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#8B5E3C] transition">Home</a></li>
            <li><a href="/products" className="hover:text-[#8B5E3C] transition">Browse Products</a></li>
            <li><a href="/orders" className="hover:text-[#8B5E3C] transition">Your Orders</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#8B5E3C]">Company</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-[#8B5E3C] transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-[#8B5E3C] transition">Contact</a></li>
            <li><a href="/terms" className="hover:text-[#8B5E3C] transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-[#8B5E3C] transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#8B5E3C]">Stay Updated</h4>
          <p className="text-sm text-[#E5E7EB] mb-2">
            Subscribe to get the latest offers and furniture trends.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-md focus:outline-none text-[#0D3547]"
            />
            <button
              type="submit"
              className="bg-[#8B5E3C] px-4 py-2 rounded-r-md text-white font-medium hover:bg-[#7A4E31] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-[#E5E7EB]">
        &copy; {new Date().getFullYear()} HomeLynk Marketplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
