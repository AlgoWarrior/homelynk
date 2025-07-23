import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const dummyCartItems: CartItem[] = [
  { id: 1, name: 'Modern Wooden Coffee Table', price: 120000, quantity: 1 },
  { id: 2, name: 'Office Chair', price: 75000, quantity: 2 },
];

const Checkout: React.FC = () => {
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit');

  const total = dummyCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    // Replace this with real order logic
    console.log('Order placed:', customer, paymentMethod, dummyCartItems);
    alert('Order placed successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-[#0D3547]">Checkout</h1>

      {/* Customer Info */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold text-[#0D3547]">Customer Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 p-3 rounded"
            value={customer.fullName}
            onChange={(e) =>
              setCustomer({ ...customer, fullName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone"
            className="border border-gray-300 p-3 rounded"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 p-3 rounded col-span-1 sm:col-span-2"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold text-[#0D3547]">Order Summary</h2>
        <ul className="divide-y divide-gray-200">
          {dummyCartItems.map((item) => (
            <li key={item.id} className="py-2 flex justify-between text-[#0D3547]">
              <span>{item.name} (x{item.quantity})</span>
              <span>RWF {item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-[#0D3547]">
          <span>Total:</span>
          <span>RWF {total}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold text-[#0D3547]">Payment Method</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-[#0D3547]">
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
            />
            <span>Credit Card</span>
          </label>
          <label className="flex items-center space-x-2 text-[#0D3547]">
            <input
              type="radio"
              name="payment"
              value="mobile"
              checked={paymentMethod === 'mobile'}
              onChange={() => setPaymentMethod('mobile')}
            />
            <span>Mobile Money</span>
          </label>
          <label className="flex items-center space-x-2 text-[#0D3547]">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        className="bg-[#8B5E3C] text-white px-6 py-3 rounded hover:bg-[#744829] transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
