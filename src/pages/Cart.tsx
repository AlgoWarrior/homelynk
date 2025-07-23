import { useState } from 'react';
import { XMarkIcon, MinusIcon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  // Cart state with quantity controls
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Elegant Wooden Chair',
      price: 120000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1627201328438-8751f597f9f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8',
      inStock: true,
    },
    {
      id: 2,
      name: 'Modern Coffee Table',
      price: 250000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1616497633466-6c3f7a0cfa93?w=600&auto=format&fit=crop&q=60',
      inStock: true,
    },
    {
      id: 3,
      name: 'Vintage Floor Lamp',
      price: 180000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop',
      inStock: false,
    },
  ]);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 5000;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingFee + tax;

  // Handle quantity changes
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header with back button */}
      <div className="flex items-center mb-8">
        <button className="mr-4 p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeftIcon className="h-5 w-5 text-[#0D3547]" />
        </button>
        <h1 className="text-3xl font-bold text-[#0D3547]">Your Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-[#0D3547] mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <button className="px-6 py-3 bg-[#0D3547] text-white rounded-lg hover:bg-[#082c39] transition shadow-md">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Cart Items List */}
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-[#0D3547]">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>

                        {!item.inStock && (
                          <p className="text-sm text-red-500 mt-1">Out of stock</p>
                        )}

                        <p className="text-lg font-semibold text-[#8B5E3C] mt-2">
                          RWF {item.price.toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={`p-1 rounded-md ${item.quantity <= 1 ? 'text-gray-300' : 'text-[#0D3547] hover:bg-gray-100'}`}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>

                          <span className="mx-3 w-8 text-center border rounded py-1 text-[#0D3547]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#0D3547] rounded-md hover:bg-gray-100"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-4 text-right">
                          <p className="text-lg font-medium text-[#0D3547]">
                            RWF {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Continue Shopping */}
              <div className="px-4 py-3 bg-gray-50 flex justify-end">
                <button className="flex items-center text-[#0D3547] hover:text-[#8B5E3C] transition">
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6 text-[#0D3547] border-b pb-2">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-[#0D3547]">RWF {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-[#0D3547]">RWF {shippingFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="text-[#0D3547]">RWF {tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="font-medium text-[#0D3547]">Total</span>
                  <span className="font-bold text-lg text-[#8B5E3C]">
                    RWF {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                disabled={cartItems.some(item => !item.inStock)}
                className={`w-full py-3 rounded-lg font-medium transition ${cartItems.some(item => !item.inStock)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#0D3547] hover:bg-[#082c39] text-white shadow-md'}`}
              >
                {cartItems.some(item => !item.inStock)
                  ? 'Cannot Checkout (Out of Stock)'
                  : 'Proceed to Checkout'}
              </button>

              {/* Payment Methods */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">We accept</h3>
                <div className="flex space-x-2">
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">VISA</span>
                  </div>
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">M-Pesa</span>
                  </div>
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;