import React, { useState } from 'react';
import { ChevronRightIcon, MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  customer: {
    name: string;
    avatar: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  date: string;
  amount: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: number;
  paymentMethod?: string;
  shippingAddress?: string;
}

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: '#HL-2841',
      customer: {
        name: 'Alice Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        email: 'alice.johnson@email.com',
        phone: '+250 788 123 456',
        address: 'Kigali, Rwanda',
      },
      date: '2023-06-15',
      amount: 245000,
      status: 'Delivered',
      items: 3,
      paymentMethod: 'Mobile Money',
      shippingAddress: 'Kigali, Rwanda',
    },
    {
      id: '#HL-2840',
      customer: {
        name: 'Robert Smith',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        email: 'robert.smith@email.com',
        phone: '+250 788 654 321',
        address: 'Huye, Rwanda',
      },
      date: '2023-06-14',
      amount: 180000,
      status: 'Shipped',
      items: 2,
      paymentMethod: 'Credit Card',
      shippingAddress: 'Huye, Rwanda',
    },
    {
      id: '#HL-2839',
      customer: {
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        email: 'maria.garcia@email.com',
        phone: '+250 788 987 654',
        address: 'Musanze, Rwanda',
      },
      date: '2023-06-13',
      amount: 320000,
      status: 'Pending',
      items: 5,
      paymentMethod: 'Cash on Delivery',
      shippingAddress: 'Musanze, Rwanda',
    },
    {
      id: '#HL-2838',
      customer: {
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
      },
      date: '2023-06-12',
      amount: 95000,
      status: 'Delivered',
      items: 1
    },
    {
      id: '#HL-2837',
      customer: {
        name: 'Sarah Miller',
        avatar: 'https://randomuser.me/api/portraits/women/90.jpg'
      },
      date: '2023-06-11',
      amount: 210000,
      status: 'Shipped',
      items: 4
    },
  ];

  const filteredOrders = orders
    .filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(order => statusFilter === 'All' || order.status === statusFilter);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key as keyof Order] < b[sortConfig.key as keyof Order]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof Order] > b[sortConfig.key as keyof Order]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-[#0D3547]/10">
      {/* View Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-[#0D3547] hover:text-[#8B5E3C] p-2 rounded-full transition"
              onClick={() => setSelectedOrder(null)}
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img src={selectedOrder.customer.avatar} alt={selectedOrder.customer.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#8B5E3C]" />
              <div>
                <h2 className="text-xl font-bold text-[#0D3547]">{selectedOrder.customer.name}</h2>
                <div className="text-sm text-[#0D3547]/70">Order {selectedOrder.id}</div>
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#0D3547]">Order Date:</span>
                <span className="text-[#0D3547]/80">{new Date(selectedOrder.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#0D3547]">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedOrder.status)}`}>{selectedOrder.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#0D3547]">Items:</span>
                <span className="text-[#0D3547]/80">{selectedOrder.items}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#0D3547]">Total:</span>
                <span className="text-[#8B5E3C] font-bold">RWF {selectedOrder.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#0D3547]">Payment:</span>
                <span className="text-[#0D3547]/80">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#0D3547]">Shipping:</span>
                <span className="text-[#0D3547]/80">{selectedOrder.shippingAddress}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#0D3547]">Contact:</span>
                <span className="text-[#0D3547]/80">{selectedOrder.customer.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#0D3547]">Email:</span>
                <span className="text-[#0D3547]/80">{selectedOrder.customer.email}</span>
              </div>
            </div>
            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              {selectedOrder.status === 'Pending' && (
                <button className="px-4 py-2 rounded-lg bg-[#8B5E3C] text-white font-semibold hover:bg-[#0D3547] transition shadow">Mark as Shipped</button>
              )}
              {selectedOrder.status === 'Shipped' && (
                <button className="px-4 py-2 rounded-lg bg-[#0D3547] text-white font-semibold hover:bg-[#8B5E3C] transition shadow">Mark as Delivered</button>
              )}
              {selectedOrder.status !== 'Delivered' && (
                <button className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition shadow">Cancel Order</button>
              )}
              <button
                className="px-4 py-2 rounded-lg border border-[#0D3547]/20 text-[#0D3547] font-semibold hover:bg-[#0D3547]/5 transition shadow"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D3547]">Order Management</h1>
          <p className="text-[#0D3547]/70">Track and manage customer orders</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-[#0D3547]/50" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              className="block w-full pl-10 pr-3 py-2 border border-[#0D3547]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#0D3547]/30 placeholder-[#0D3547]/40 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-[#0D3547]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#0D3547]/30 text-[#0D3547] bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#0D3547]">
              <FunnelIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#0D3547]/10">
          <thead className="bg-[#0D3547]/5">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider cursor-pointer hover:text-[#8B5E3C] transition"
                onClick={() => requestSort('id')}
              >
                <div className="flex items-center">
                  Order ID
                  {sortConfig?.key === 'id' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider">
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider cursor-pointer hover:text-[#8B5E3C] transition"
                onClick={() => requestSort('date')}
              >
                <div className="flex items-center">
                  Date
                  {sortConfig?.key === 'date' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider cursor-pointer hover:text-[#8B5E3C] transition"
                onClick={() => requestSort('amount')}
              >
                <div className="flex items-center">
                  Total
                  {sortConfig?.key === 'amount' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0D3547] uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#0D3547] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#0D3547]/10">
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#0D3547]/5 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#0D3547]">{order.id}</div>
                    <div className="text-sm text-[#0D3547]/70">{order.items} item{order.items !== 1 ? 's' : ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                        <img className="h-full w-full object-cover" src={order.customer.avatar} alt={order.customer.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#0D3547]">{order.customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#0D3547]">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#0D3547]">RWF {order.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="group flex items-center text-[#0D3547] hover:text-[#8B5E3C] transition"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                      <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  <div className="text-[#0D3547]/70 py-8">
                    <p className="text-lg">No orders found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination would go here */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-[#0D3547]/70">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedOrders.length}</span> of{' '}
          <span className="font-medium">{sortedOrders.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-[#0D3547]/20 rounded text-[#0D3547] hover:bg-[#0D3547]/5 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-[#0D3547]/20 rounded text-[#0D3547] hover:bg-[#0D3547]/5 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;