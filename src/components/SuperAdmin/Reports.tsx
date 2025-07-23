import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon, UserGroupIcon, ShoppingBagIcon, ChartBarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const stats = [
  {
    id: 1,
    title: 'Total Sales',
    value: '$45,200',
    change: 12.5,
    changeType: 'up',
    icon: ChartBarIcon,
    bg: 'bg-[#0D3547]'
  },
  {
    id: 2,
    title: 'Total Users',
    value: '2,340',
    change: 3.2,
    changeType: 'up',
    icon: UserGroupIcon,
    bg: 'bg-[#8B5E3C]'
  },
  {
    id: 3,
    title: 'Most Viewed Product',
    value: 'Modern Sofa',
    change: 8.1,
    changeType: 'down',
    icon: ShoppingBagIcon,
    bg: 'bg-[#0D3547]'
  },
];

const salesData = [
  { day: 'Mon', value: 1200 },
  { day: 'Tue', value: 1800 },
  { day: 'Wed', value: 900 },
  { day: 'Thu', value: 2200 },
  { day: 'Fri', value: 1700 },
  { day: 'Sat', value: 2500 },
  { day: 'Sun', value: 2000 },
];

const usersData = [
  { month: 'Jan', value: 200 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 400 },
  { month: 'Apr', value: 350 },
  { month: 'May', value: 500 },
  { month: 'Jun', value: 590 },
];

const Reports: React.FC = () => {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 1200);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0d3547] mb-4">Reports Dashboard</h1>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map(({ id, title, value, change, changeType, icon: Icon, bg }) => (
          <div key={id} className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className={`p-4 rounded-full ${bg} text-white mr-4`}>
              <Icon className="h-8 w-8" />
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
                <span className={`ml-1 ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>{change}%</span>
                <span className="text-gray-400 ml-1">this period</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-[#0D3547]">Sales This Week</h2>
            <button
              onClick={handleExport}
              className="flex items-center px-3 py-1 bg-[#8B5E3C] text-white rounded hover:bg-[#0D3547] transition-colors"
              disabled={exporting}
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
              {exporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
          {/* Simple Bar Chart */}
          <div className="flex items-end h-40 space-x-2 mt-4">
            {salesData.map((d) => (
              <div key={d.day} className="flex flex-col items-center flex-1">
                <div
                  className="w-7 rounded-t bg-gradient-to-t from-[#8B5E3C] to-[#0D3547]"
                  style={{ height: `${d.value / 30}px` }}
                ></div>
                <span className="mt-2 text-xs text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Users Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-[#0D3547] mb-2">User Growth (Last 6 Months)</h2>
          {/* Simple Line Chart (SVG) */}
          <svg viewBox="0 0 240 100" className="w-full h-32">
            <polyline
              fill="none"
              stroke="#8B5E3C"
              strokeWidth="3"
              points={usersData.map((d, i) => `${i * 40},${100 - d.value / 6}`).join(' ')}
            />
            {usersData.map((d, i) => (
              <circle
                key={d.month}
                cx={i * 40}
                cy={100 - d.value / 6}
                r="4"
                fill="#0D3547"
              />
            ))}
          </svg>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {usersData.map((d) => (
              <span key={d.month}>{d.month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Most Viewed Products Table */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-bold text-[#0D3547] mb-4">Most Viewed Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#0d3547]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Modern Sofa</td>
                <td className="px-6 py-4 whitespace-nowrap">1,200</td>
                <td className="px-6 py-4 whitespace-nowrap">Living Room</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Oak Dining Table</td>
                <td className="px-6 py-4 whitespace-nowrap">950</td>
                <td className="px-6 py-4 whitespace-nowrap">Dining</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Ergonomic Office Chair</td>
                <td className="px-6 py-4 whitespace-nowrap">870</td>
                <td className="px-6 py-4 whitespace-nowrap">Office</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
