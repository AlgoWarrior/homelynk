import React from 'react';

interface ProductCardProps {
  imageUrl?: string;
  name?: string;
  description?: string;
  price?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl = 'https://via.placeholder.com/400x300?text=No+Image',
  name = 'Unnamed product',
  description = 'No description available',
  price = 0,
}) => {
  return (
    <div className="bg-[#FAF3E0] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#111827] mb-2">{name}</h3>
        <p className="text-[#4B5563] text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#111827] font-bold text-lg">${price.toFixed(2)}</span>
          <button className="bg-[#0F766E] text-white px-4 py-2 rounded hover:bg-[#0d5e58] border border-transparent hover:border-[#D4AF37] transition">
            view
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
