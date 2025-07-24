import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  BellIcon, 
  UserCircleIcon,
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function SellerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useState<User>({ name: 'John Doe', email: 'john@example.com' });
  const [notificationCount] = useState(3);
  const location = useLocation();

  const navigation: NavigationItem[] = [
    { name: 'Overview', href: '/seller', icon: HomeIcon },
    { name: 'Manage Products', href: '/seller/products', icon: CubeIcon },
    { name: 'Orders', href: '/seller/orders', icon: ClipboardDocumentListIcon },
    { name: 'Settings', href: '/seller/settings', icon: Cog6ToothIcon },
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (isSidebarOpen && sidebar && !sidebar.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const isActiveRoute = (href: string) => {
    if (href === '/seller') {
      return location.pathname === '/seller' || location.pathname === '/seller/';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile backdrop overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0D3547] text-white transform z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 shadow-xl`}
        aria-label="Seller dashboard navigation"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-6 border-b border-[#1a4a5c]">
            <div>
              <h2 className="text-xl font-bold text-white">HomeLynk</h2>
              <p className="text-sm text-gray-300">Seller Dashboard</p>
            </div>
            <button 
              className="md:hidden p-1 rounded-md hover:bg-[#1a4a5c] transition-colors"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2" aria-label="Main navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#8B5E3C] text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-[#1a4a5c]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-[#1a4a5c]">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a4a5c]">
              <UserCircleIcon className="h-8 w-8 text-gray-300" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between bg-[#0D3547] text-white px-4 py-3 shadow-md">
          <button 
            id="menu-button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 rounded-md hover:bg-[#1a4a5c] transition-colors"
            aria-label="Open sidebar"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <button 
              className="relative p-1 rounded-md hover:bg-[#1a4a5c] transition-colors"
              aria-label={`Notifications ${notificationCount > 0 ? `(${notificationCount} unread)` : ''}`}
            >
              <BellIcon className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Desktop Top Bar */}
        <header className="hidden md:flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-[#0D3547]">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your products and track your sales</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button 
              className="relative p-2 text-[#0D3547] hover:text-[#8B5E3C] hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label={`Notifications ${notificationCount > 0 ? `(${notificationCount} unread)` : ''}`}
            >
              <BellIcon className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <UserCircleIcon className="h-8 w-8 text-[#0D3547]" />
              <div className="text-left">
                <p className="text-sm font-medium text-[#0D3547]">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#0D3547] text-white px-4 py-2 rounded-lg hover:bg-[#0D3547]/90 transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
