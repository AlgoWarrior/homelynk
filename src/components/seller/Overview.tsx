import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  CubeIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  // Sample data
  const stats = [
    {
      id: 1,
      label: "Total Products",
      value: 245,
      icon: CubeIcon,
      change: "+12%",
      changeType: "positive",
    },
    {
      id: 2,
      label: "Total Orders",
      value: 128,
      icon: ShoppingCartIcon,
      change: "+5%",
      changeType: "positive",
    },
    {
      id: 3,
      label: "Total Revenue",
      value: "$12,845",
      icon: CurrencyDollarIcon,
      change: "+23%",
      changeType: "positive",
    },
    {
      id: 4,
      label: "Pending Orders",
      value: 18,
      icon: ClockIcon,
      change: "-2%",
      changeType: "negative",
    },
  ];

  const notifications = [
    { id: 1, text: "New order received #12345", time: "2 min ago", read: false },
    { id: 2, text: "Inventory low for Product X", time: "1 hour ago", read: true },
    { id: 3, text: "System update scheduled for tonight", time: "3 hours ago", read: true },
  ];

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales 2023",
        data: [6500, 5900, 8000, 8100, 5600, 5500, 7200],
        backgroundColor: "#0D3547",
        borderRadius: 6,
      },
      {
        label: "Sales 2022",
        data: [5000, 4800, 6000, 6500, 5000, 4500, 6000],
        backgroundColor: "#8B5E3C",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Comparison",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Page Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0D3547]">
          Dashboard Overview
        </h1>
        <div className="flex items-center space-x-2">
          <BellIcon className="h-6 w-6 text-[#8B5E3C]" />
          <span className="hidden sm:inline text-sm text-gray-600">
            Last updated: Just now
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-[#0D3547]/10 mr-4">
                    <Icon className="h-6 w-6 text-[#0D3547]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <p className="text-2xl font-semibold text-[#0D3547]">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm ${stat.changeType === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                    }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>


      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0D3547]">
            Sales Performance
          </h2>
          <select className="text-sm border border-gray-200 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last year</option>
          </select>
        </div>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#0D3547]">
              Notifications
            </h2>
            <span className="text-xs bg-[#8B5E3C] text-white px-2 py-1 rounded-full">
              {notifications.filter(n => !n.read).length} New
            </span>
          </div>
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-3 rounded-lg transition-colors ${!notification.read ? "bg-[#0D3547]/5 border-l-4 border-[#8B5E3C]" : "hover:bg-gray-50"}`}
              >
                <p className={`text-gray-800 ${!notification.read ? "font-medium" : ""}`}>
                  {notification.text}
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </li>
            ))}
          </ul>
          <button className="mt-4 text-sm text-[#8B5E3C] hover:text-[#0D3547] font-medium">
            View all notifications →
          </button>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-semibold text-[#0D3547] mb-4">
            Recent Activity
          </h2>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg text-gray-400">
            Recent orders and activities will appear here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;