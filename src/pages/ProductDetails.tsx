import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, ArrowLeftIcon } from '@heroicons/react/24/outline';

const dummyProduct = {
  id: 1,
  name: 'Modern Wooden Coffee Table',
  price: 150000, // RWF
  originalPrice: 180000,
  description: 'A beautifully crafted coffee table made from solid oak wood. Perfect for living rooms with a modern or rustic feel. Handmade by local artisans with sustainable materials.',
  images: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1583845112203-4543754ea4b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  ],
  size: '120cm × 60cm × 45cm',
  weight: '15kg',
  materials: 'Solid oak wood, metal legs',
  color: 'Natural wood with dark stain',
  category: 'Living Room',
  stock: 12,
  rating: 4.5,
  reviews: [
    { id: 1, name: 'Alice M.', comment: 'Amazing quality! The table is even more beautiful in person.', rating: 5, date: '2023-05-15' },
    { id: 2, name: 'Bob T.', comment: 'Looks great in my house. Delivery was faster than expected.', rating: 4, date: '2023-04-22' },
    { id: 3, name: 'Claire J.', comment: 'Good value for money, though assembly took some time.', rating: 4, date: '2023-03-10' },
  ],
  shippingInfo: 'Free delivery in Kigali. 3-5 business days.',
  returnPolicy: '30-day return policy',
  sku: 'HL-FUR-001',
};

const ProductDetails: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(dummyProduct.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();

  const handleIncrease = () => setQuantity(prev => Math.min(prev + 1, dummyProduct.stock));
  const handleDecrease = () => setQuantity(prev => Math.max(prev - 1, 1));
  const toggleWishlist = () => setIsWishlisted(!isWishlisted);
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, you would add the comment to the product reviews
      alert('Comment submitted!');
      setNewComment('');
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-[#D4AF37]' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-[#0D3547] hover:text-[#8B5E3C] mb-4 transition"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
            <img
              src={selectedImage}
              alt={dummyProduct.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? (
                <HeartIcon className="h-6 w-6 text-[#8B5E3C]" />
              ) : (
                <HeartOutline className="h-6 w-6 text-[#0D3547]" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {dummyProduct.images.map((img) => (
              <button
                key={img}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square rounded-md overflow-hidden border-2 transition ${selectedImage === img
                  ? 'border-[#8B5E3C]'
                  : 'border-transparent hover:border-[#0D3547]/30'
                  }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0D3547]">{dummyProduct.name}</h1>
              <div className="flex items-center mt-2">
                {renderStars(dummyProduct.rating)}
                <span className="ml-2 text-sm text-[#0D3547]/70">
                  {dummyProduct.rating} ({dummyProduct.reviews.length} reviews)
                </span>
              </div>
            </div>
            <span className="text-xs bg-[#0D3547]/10 text-[#0D3547] px-2 py-1 rounded">
              SKU: {dummyProduct.sku}
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#0D3547]">
                RWF {dummyProduct.price.toLocaleString()}
              </span>
              {dummyProduct.originalPrice && (
                <span className="ml-2 text-lg text-[#0D3547]/70 line-through">
                  RWF {dummyProduct.originalPrice.toLocaleString()}
                </span>
              )}
              {dummyProduct.originalPrice && (
                <span className="ml-2 text-sm bg-[#8B5E3C]/10 text-[#8B5E3C] px-2 py-0.5 rounded">
                  {Math.round((1 - dummyProduct.price / dummyProduct.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>
            <p className="text-sm text-green-600 mt-1">
              {dummyProduct.stock > 5
                ? 'In Stock'
                : dummyProduct.stock > 0
                  ? `Only ${dummyProduct.stock} left`
                  : 'Out of Stock'}
            </p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className={`text-[#0D3547] ${!showFullDescription && 'line-clamp-3'}`}>
              {dummyProduct.description}
            </p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm text-[#8B5E3C] hover:underline mt-1"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          </div>

          {/* Key Features */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#0D3547]">Size:</span>
              <span className="ml-1 text-sm text-[#0D3547]/70">{dummyProduct.size}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#0D3547]">Weight:</span>
              <span className="ml-1 text-sm text-[#0D3547]/70">{dummyProduct.weight}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#0D3547]">Materials:</span>
              <span className="ml-1 text-sm text-[#0D3547]/70">{dummyProduct.materials}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#0D3547]">Color:</span>
              <span className="ml-1 text-sm text-[#0D3547]/70">{dummyProduct.color}</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-8">
            <div className="flex items-center">
              <span className="mr-3 text-[#0D3547] font-medium">Quantity:</span>
              <div className="flex items-center border border-[#0D3547]/20 rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-[#0D3547] hover:bg-[#0D3547]/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  disabled={quantity >= dummyProduct.stock}
                  className="px-3 py-2 text-[#0D3547] hover:bg-[#0D3547]/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="ml-2 text-sm text-[#0D3547]/70">
                {dummyProduct.stock} available
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              disabled={dummyProduct.stock <= 0}
              className="flex-1 bg-gradient-to-r from-[#0D3547] to-[#8B5E3C] text-white py-3 px-6 rounded-xl shadow-lg hover:from-[#8B5E3C] hover:to-[#0D3547] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed font-semibold text-lg"
            >
              Add to Cart
            </button>
            <button
              disabled={dummyProduct.stock <= 0}
              onClick={() => navigate('/checkout', { state: { product: dummyProduct, quantity } })}
              className="flex-1 border-2 border-[#0D3547] text-[#0D3547] py-3 px-6 rounded-xl shadow hover:bg-[#0D3547]/5 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed font-semibold text-lg"
            >
              Buy Now
            </button>
          </div>

          {/* Shipping Info */}
          <div className="mt-6 p-4 bg-[#0D3547]/5 rounded-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-[#0D3547]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="ml-2 text-sm text-[#0D3547]">{dummyProduct.shippingInfo}</span>
            </div>
            <div className="flex items-center mt-2">
              <svg className="h-5 w-5 text-[#0D3547]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="ml-2 text-sm text-[#0D3547]">{dummyProduct.returnPolicy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 border-b border-[#0D3547]/10">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details'
              ? 'border-[#8B5E3C] text-[#0D3547]'
              : 'border-transparent text-[#0D3547]/70 hover:text-[#0D3547] hover:border-[#0D3547]/30'
              }`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specs'
              ? 'border-[#8B5E3C] text-[#0D3547]'
              : 'border-transparent text-[#0D3547]/70 hover:text-[#0D3547] hover:border-[#0D3547]/30'
              }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews'
              ? 'border-[#8B5E3C] text-[#0D3547]'
              : 'border-transparent text-[#0D3547]/70 hover:text-[#0D3547] hover:border-[#0D3547]/30'
              }`}
          >
            Reviews ({dummyProduct.reviews.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'details' && (
          <div className="prose max-w-none text-[#0D3547]">
            <h3 className="text-lg font-medium">About this item</h3>
            <ul className="mt-4 space-y-2">
              <li>Handcrafted from premium solid oak wood for durability</li>
              <li>Modern design with clean lines complements various decor styles</li>
              <li>Sturdy metal legs provide excellent stability</li>
              <li>Eco-friendly finish with non-toxic stains</li>
              <li>Easy to assemble with included tools and instructions</li>
            </ul>
            <h3 className="text-lg font-medium mt-6">Care Instructions</h3>
            <p className="mt-2">
              Wipe clean with a dry or slightly damp cloth. Avoid harsh chemicals.
              Use coasters for hot or wet items to protect the surface.
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-[#0D3547]">Dimensions</h3>
              <table className="mt-2 w-full">
                <tbody className="divide-y divide-[#0D3547]/10">
                  <tr>
                    <td className="py-2 text-sm font-medium text-[#0D3547]/70">Width</td>
                    <td className="py-2 text-sm text-[#0D3547]">120 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-[#0D3547]/70">Depth</td>
                    <td className="py-2 text-sm text-[#0D3547]">60 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-[#0D3547]/70">Height</td>
                    <td className="py-2 text-sm text-[#0D3547]">45 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-[#0D3547]/70">Weight</td>
                    <td className="py-2 text-sm text-[#0D3547]">15 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#0D3547]">Materials & Construction</h3>
              <table className="mt-2 w-full">
                <tbody className="divide-y divide-[#0D3547]/10">
                  <tr>
                    <td className="py-2 text-sm font-medium text-[#0D3547]/70">Primary Material</td>
                    <td className="py-2 text-sm text-[#0D3547]">Solid oak wood</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-[#0D3547]/70">Leg Material</td>
                    <td className="py-2 text-sm text-[#0D3547]">Powder-coated metal</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-[#0D3547]/70">Finish</td>
                    <td className="py-2 text-sm text-[#0D3547]">Natural wood with dark stain</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-[#0D3547]/70">Assembly</td>
                    <td className="py-2 text-sm text-[#0D3547]">Required (tools included)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center">
                <div className="text-4xl font-bold text-[#0D3547]">{dummyProduct.rating}</div>
                <div className="ml-3">
                  <div className="flex">{renderStars(dummyProduct.rating)}</div>
                  <p className="text-sm text-[#0D3547]/70 mt-1">
                    Based on {dummyProduct.reviews.length} reviews
                  </p>
                </div>
              </div>
              <button className="mt-4 md:mt-0 bg-[#0D3547] text-white py-2 px-4 rounded-lg hover:bg-[#0D3547]/90 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] transition">
                Write a Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="mt-8 space-y-6">
              {dummyProduct.reviews.map((review) => (
                <div key={review.id} className="border-b border-[#0D3547]/10 pb-6 last:border-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-[#0D3547]">{review.name}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="ml-2 text-sm text-[#0D3547]/70">{review.date}</span>
                      </div>
                    </div>
                    <button className="text-[#0D3547]/50 hover:text-[#8B5E3C]">
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-[#0D3547]">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-[#0D3547]">Leave a Review</h3>
              <form onSubmit={handleCommentSubmit} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-[#0D3547]">
                    Your Rating
                  </label>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-gray-300 hover:text-[#D4AF37] focus:outline-none"
                        onClick={() => {/* In a real app, you would set the rating state */ }}
                      >
                        <StarIcon className="h-6 w-6" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-[#0D3547]">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mt-1 block w-full border border-[#0D3547]/20 rounded-lg px-4 py-3 placeholder-[#0D3547]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#0D3547]/30 transition-all duration-200"
                    placeholder="Share your thoughts about this product..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-[#0D3547] text-white py-2 px-6 rounded-lg hover:bg-[#0D3547]/90 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetails;