import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardIcon,
  UsersIcon,
  DocumentTextIcon,
  CheckBadgeIcon,
  BellIcon,
} from '@heroicons/react/24/solid';
import logo from '/HOMELYNK .png';

const navLinks = [
  { to: '/admin', label: 'Overview', icon: HomeIcon },
  { to: '/admin/approve-sellers', label: 'Sellers', icon: CheckBadgeIcon },
  { to: '/admin/approve-products', label: 'Products', icon: ClipboardIcon },
  { to: '/admin/manage-users', label: 'Users', icon: UsersIcon },
  { to: '/admin/reports', label: 'Reports', icon: DocumentTextIcon },
];

const SuperAdminDashboard: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Static Sidebar */}
      <aside
        className="w-64 bg-[#0D3547] text-white p-8 flex flex-col min-h-screen shadow-lg fixed left-0 top-0 h-full z-20"
        aria-label="Sidebar"
      >
        <div className="flex flex-col items-center mb-10 gap-3">
          <img src={logo} alt="Logo" className="h-12 w-auto rounded-lg shadow bg-white" onError={e => { (e.target as HTMLImageElement).src = '/HOMELYNK.jpg'; }} />
          <span className="text-xl font-bold tracking-wide">Super Admin</span>
        </div>
        <nav className="flex-1 space-y-3 mt-2">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors font-medium text-base gap-3
                  ${isActive ? 'bg-[#8B5E3C] text-white shadow' : 'hover:bg-[#8B5E3C]/80 hover:text-white text-gray-100'}
                  focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]`}
                tabIndex={0}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-6 w-6" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content area with top bar */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="fixed left-64 right-0 top-0 h-16 bg-white flex items-center justify-between px-8 z-30 shadow-md w-auto border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-[#0D3547] tracking-wide">Admin</span>
          </div>
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <BellIcon className="h-7 w-7 text-[#0D3547]" />
              <span className="absolute -top-1 -right-1 bg-[#8B5E3C] text-white text-xs rounded-full px-1.5 py-0.5 font-bold">3</span>
            </div>
            {/* Logout Button */}
            <button
              className="bg-[#8B5E3C] text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-[#a06c3a] transition-colors"
              onClick={() => {/* Add logout logic here */ }}
            >
              Logout
            </button>
          </div>
        </header>
        {/* Main Content (pushed down by header height) */}
        <main className="pt-20 p-6 sm:p-8 lg:p-10 max-w-full min-h-screen transition-all">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
