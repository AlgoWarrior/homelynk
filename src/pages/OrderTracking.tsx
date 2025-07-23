import { useState } from 'react';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');

  // Dummy orders data
  const dummyOrders = [
    {
      id: 'ORD12345',
      status: 'Shipped',
      date: '2023-11-15',
      expectedDelivery: '2023-11-20',
      items: [
        { name: 'Modern Coffee Table', quantity: 1, price: 250000 },
        { name: 'Elegant Wooden Chair', quantity: 2, price: 120000 },
      ],
      address: '123 Main St, Kigali, Rwanda',
    },
    {
      id: 'ORD67890',
      status: 'Delivered',
      date: '2023-11-05',
      expectedDelivery: '2023-11-10',
      items: [
        { name: 'Vintage Floor Lamp', quantity: 1, price: 180000 },
      ],
      address: '456 Peace Ave, Kigali, Rwanda',
    },
  ];

  const handleTrackOrder = () => {
    setError('');
    if (!orderId.trim()) {
      setError('Please enter an Order ID');
      return;
    }

    const foundOrder = dummyOrders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setError('Order not found. Please check your Order ID.');
      setOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#0D3547] mb-6">Track Your Order</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your Order ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
          />
          <button
            onClick={handleTrackOrder}
            className="px-6 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0D635C] transition"
          >
            Track Order
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {order && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-xl font-semibold text-[#0D3547]">Order #{order.id}</h2>
                <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-[#0D3547] mb-4">Order Summary</h3>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item: any, index: number) => (
                <li key={index} className="py-4 flex justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">{item.quantity}x</span>
                    <span className="text-[#0D3547]">{item.name}</span>
                  </div>
                  <span className="text-[#8B5E3C]">RWF {item.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
              <span className="font-medium text-[#0D3547]">Total</span>
              <span className="font-bold text-[#8B5E3C]">
                RWF {order.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-[#0D3547] mb-3">Delivery Information</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Expected Delivery:</span> {new Date(order.expectedDelivery).toLocaleDateString()}
                </p>
                {order.address && (
                  <p className="text-gray-700 mt-2">
                    <span className="font-medium">Address:</span> {order.address}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#0D3547] mb-3">Need Help?</h3>
                <p className="text-gray-700 mb-2">Contact our customer support for assistance with your order.</p>
                <button className="px-4 py-2 border border-[#0F766E] text-[#0F766E] rounded-lg hover:bg-[#0F766E]/10 transition">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;