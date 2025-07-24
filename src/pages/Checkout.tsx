import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const dummyCartItems: CartItem[] = [
  { id: 1, name: 'Modern Wooden Coffee Table', price: 120000, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1627201328438-8751f597f9f3?w=600&auto=format&fit=crop&q=60' },
  { id: 2, name: 'Office Chair', price: 75000, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop' },
];

const Checkout: React.FC = () => {
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = dummyCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    setPlacingOrder(true);
    setTimeout(() => {
      setOrderPlaced(true);
      setPlacingOrder(false);
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <svg className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        <h2 className="text-2xl font-bold text-[#0D3547] mb-2">Order Placed!</h2>
        <p className="text-[#0D3547]/70 mb-6">Thank you for your purchase. You will receive a confirmation email soon.</p>
        <a href="/" className="inline-block px-6 py-3 bg-[#0D3547] text-white rounded-lg font-semibold hover:bg-[#8B5E3C] transition">Back to Home</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0D3547] text-white font-bold">1</span>
          <span className="text-[#0D3547] font-medium">Details</span>
        </div>
        <span className="w-8 h-1 bg-[#8B5E3C]/30 mx-2 rounded-full"></span>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8B5E3C] text-white font-bold">2</span>
          <span className="text-[#8B5E3C] font-medium">Payment</span>
        </div>
        <span className="w-8 h-1 bg-[#8B5E3C]/30 mx-2 rounded-full"></span>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-[#0D3547] font-bold">3</span>
          <span className="text-[#0D3547]/60 font-medium">Complete</span>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-[#0D3547] mb-8 tracking-tight text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Customer Info & Payment */}
        <div className="space-y-8">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <h2 className="text-lg font-semibold text-[#0D3547] mb-2">Customer Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]/40 focus:border-[#8B5E3C]"
                value={customer.fullName}
                onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]/40 focus:border-[#8B5E3C]"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]/40 focus:border-[#8B5E3C]"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Address"
                className="border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-[#8B5E3C]/40 focus:border-[#8B5E3C]"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <h2 className="text-lg font-semibold text-[#0D3547] mb-2">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 text-[#0D3547] cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                  className="accent-[#8B5E3C]"
                />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-3 text-[#0D3547] cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="mobile"
                  checked={paymentMethod === 'mobile'}
                  onChange={() => setPaymentMethod('mobile')}
                  className="accent-[#8B5E3C]"
                />
                <span>Mobile Money</span>
              </label>
              <label className="flex items-center space-x-3 text-[#0D3547] cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="accent-[#8B5E3C]"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6 h-fit">
          <h2 className="text-lg font-semibold text-[#0D3547] mb-2">Order Summary</h2>
          <ul className="divide-y divide-gray-100">
            {dummyCartItems.map((item) => (
              <li key={item.id} className="py-4 flex items-center gap-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                <div className="flex-1">
                  <div className="font-medium text-[#0D3547]">{item.name}</div>
                  <div className="text-sm text-[#0D3547]/60">Qty: {item.quantity}</div>
                </div>
                <div className="font-bold text-[#8B5E3C] text-lg">RWF {(item.price * item.quantity).toLocaleString()}</div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-[#0D3547] text-lg border-t border-gray-100 pt-4">
            <span>Total:</span>
            <span>RWF {total.toLocaleString()}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className="w-full mt-6 bg-gradient-to-r from-[#0D3547] to-[#8B5E3C] text-white py-3 px-6 rounded-xl shadow-lg hover:from-[#8B5E3C] hover:to-[#0D3547] font-semibold text-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {placingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
