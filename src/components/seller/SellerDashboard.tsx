import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function SellerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0D3547] text-white transform z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:translate-x-0`}
      >
        <div className="flex flex-col p-6 h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Seller Dashboard</h2>
            <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            <Link to="/seller" className="hover:text-[#8B5E3C]">Overview</Link>
            <Link to="/seller/products" className="hover:text-[#8B5E3C]">Manage Products</Link>
            <Link to="/seller/orders" className="hover:text-[#8B5E3C]">Orders</Link>
            <Link to="/seller/settings" className="hover:text-[#8B5E3C]">Settings</Link>
          </nav>
        </div>
      </aside>

      {/* Content area with top bar */}
      <div className="flex flex-col flex-1 md:ml-64 min-h-screen">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between bg-[#0D3547] text-white px-4 py-3 fixed top-0 left-0 right-0 z-50">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold">Seller Dashboard</h1>
          <div className="w-6"></div>
        </header>

        {/* Desktop Top Bar */}
        <header className="hidden md:flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4 fixed top-0 left-64 right-0 z-30">
          <h1 className="text-xl font-semibold text-[#0D3547]">Welcome, Seller!</h1>
          <div className="flex items-center gap-6">
            <button className="relative text-[#0D3547] hover:text-[#8B5E3C]">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center gap-2">
              <UserCircleIcon className="h-8 w-8 text-[#0D3547]" />
              <span className="text-[#0D3547] font-medium">John Doe</span>
            </div>
            <button className="bg-[#0D3547] text-white px-4 py-2 rounded hover:bg-[#0D3547]/90">
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 mt-[56px] md:mt-[72px]">
          {/* 56px for mobile top bar height, 72px for desktop top bar height */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
