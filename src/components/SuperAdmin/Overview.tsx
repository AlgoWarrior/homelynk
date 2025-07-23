import React from 'react';
import {
  UserGroupIcon,
  UsersIcon,
  ShoppingBagIcon,
  ClipboardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  UserCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  change: number;
  changeType: 'up' | 'down';
  bgColor: 'primary' | 'accent';
}

// Reusable Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, changeType, bgColor }) => {
  const IconComponent = icon;
  const bgClass = bgColor === 'primary' ? 'bg-[#0D3547]' : 'bg-[#8B5E3C]';
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105">
      <div className={`p-4 rounded-full ${bgClass} text-white mr-4`}>
        <IconComponent className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-[#0D3547]">{value}</p>
        <div className="flex items-center text-sm mt-1">
          {changeType === 'up' ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className={`ml-1 ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {change}%
          </span>
          <span className="text-gray-400 ml-1">this month</span>
        </div>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  icon: React.ElementType;
  action: string;
  target: string;
  time: string;
}

// Reusable Activity Item Component
const ActivityItem: React.FC<ActivityItemProps> = ({ icon, action, target, time }) => {
  const IconComponent = icon;
  return (
    <li className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center">
        <IconComponent className="h-5 w-5 text-[#8B5E3C] mr-3" />
        <div>
          <p className="text-sm font-medium text-[#0D3547]">{action}</p>
          <p className="text-xs text-gray-500">{target}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </li>
  );
};


const OverviewAdmin: React.FC = () => {
  const stats: (StatCardProps & { id: number })[] = [
    { id: 1, icon: UserGroupIcon, title: 'Total Sellers', value: '1,250', change: 12, changeType: 'up', bgColor: 'primary' },
    { id: 2, icon: UsersIcon, title: 'Total Buyers', value: '32,854', change: 8, changeType: 'up', bgColor: 'accent' },
    { id: 3, icon: ShoppingBagIcon, title: 'Total Products', value: '5,420', change: 2, changeType: 'down', bgColor: 'primary' },
    { id: 4, icon: ClipboardIcon, title: 'Pending Approvals', value: '42', change: 5, changeType: 'up', bgColor: 'accent' },
  ];

  const recentActivities = [
    { id: 1, icon: UserCircleIcon, action: 'New seller registered', target: 'John Doe', time: '2 mins ago' },
    { id: 2, icon: ClipboardIcon, action: 'Product approved', target: 'Modern Chair', time: '15 mins ago' },
    { id: 3, icon: UserCircleIcon, action: 'User deactivated', target: 'Jane Smith', time: '1 hour ago' },
    { id: 4, icon: ShoppingBagIcon, action: 'New order placed', target: 'Order #11234', time: '3 hours ago' },
  ];

  const quickActions = [
    { id: 1, icon: EyeIcon, label: 'Review Approvals', },
    { id: 2, icon: ShoppingBagIcon, label: 'View Products' },
    { id: 3, icon: UsersIcon, label: 'Manage Users' },
    { id: 4, icon: DocumentTextIcon, label: 'Generate Reports' },
  ];


  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0D3547] mb-6">Admin Overview</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => <StatCard key={stat.id} {...stat} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Sales & Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sales This Month */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#0D3547] mb-4">Sales This Month</h2>
              <div className="flex items-baseline mb-4">
                <p className="text-4xl font-extrabold text-[#0D3547]">$75,480</p>
                <div className="flex items-center ml-4 text-green-500">
                  <ArrowUpIcon className="h-5 w-5" />
                  <span className="font-semibold">15.3%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-4">Daily sales progress for this month.</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-gradient-to-r from-[#8B5E3C] to-[#0D3547] h-4 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#0D3547] mb-4">Recent Activity</h2>
              <ul>
                {recentActivities.map(activity => <ActivityItem key={activity.id} {...activity} />)}
              </ul>
            </div>
          </div>

          {/* Right Column: Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#0D3547] mb-4">Quick Actions</h2>
              <div className="space-y-4">
                {quickActions.map(action => {
                  const Icon = action.icon;
                  return (
                    <button key={action.id} className="w-full flex items-center p-4 bg-gray-100 rounded-lg text-[#0D3547] font-semibold hover:bg-[#0D3547] hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="h-6 w-6 mr-4" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewAdmin;
