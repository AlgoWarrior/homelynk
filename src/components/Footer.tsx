import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0D3547]/90 to-[#8B5E3C]/80 text-white py-20 px-2 backdrop-blur border-t border-[#8B5E3C]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 items-start">
        {/* Logo & About */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 mb-2">
            <img src="/HOMELYNK.png" alt="HomeLynk Logo" className="h-16 w-auto rounded-lg shadow-lg bg-white/80 p-2" onError={e => { (e.target as HTMLImageElement).src = '/HOMELYNK.jpg'; }} />
            <span className="text-3xl font-extrabold tracking-tight text-white">HomeLynk</span>
          </div>
          <p className="text-base text-[#F3E9DD] leading-relaxed">
            HomeLynk is Rwanda’s trusted online marketplace for unique, high-quality furniture and home decor crafted by local artisans.
          </p>
          <p className="text-sm text-[#FFD9A0] mt-2">
            Discover, shop, and support Rwandan creativity.
          </p>
          <div className="flex gap-3 mt-3">
            <a href="#" className="hover:text-[#8B5E3C] transition" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.12 2.94 3.99 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" /></svg></a>
            <a href="#" className="hover:text-[#8B5E3C] transition" aria-label="Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg></a>
            <a href="#" className="hover:text-[#8B5E3C] transition" aria-label="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.808.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.277-.353-2.45-1.32-3.417-.967-.967-2.14-1.261-3.417-1.32C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-11.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg></a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#FFD9A0] tracking-wide uppercase">Shop</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#FFD9A0] transition">Home</a></li>
            <li><a href="/all-products" className="hover:text-[#FFD9A0] transition">Browse Products</a></li>
            <li><a href="/orders" className="hover:text-[#FFD9A0] transition">Your Orders</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#FFD9A0] tracking-wide uppercase">Company</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-[#FFD9A0] transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-[#FFD9A0] transition">Contact</a></li>
            <li><a href="/terms" className="hover:text-[#FFD9A0] transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-[#FFD9A0] transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#FFD9A0] tracking-wide uppercase">Stay Updated</h4>
          <p className="text-sm text-[#F3E9DD] mb-3">
            Subscribe to get the latest offers and furniture trends.
          </p>
          <form className="flex rounded-lg overflow-hidden shadow">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 text-[#0D3547] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#FFD9A0] px-5 py-2 text-[#0D3547] font-bold hover:bg-[#8B5E3C] hover:text-white transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16 text-center text-base text-[#F3E9DD] tracking-wide">
        &copy; {new Date().getFullYear()} HomeLynk Marketplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
