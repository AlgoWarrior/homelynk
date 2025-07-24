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
    <div className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.025] transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[370px] max-h-[400px]">
      <div className="relative w-full aspect-[4/3] bg-gray-100 min-h-[150px] max-h-[170px]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover object-center rounded-t-2xl group-hover:brightness-95 transition"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </div>
      <div className="flex-1 flex flex-col p-3">
        <h3 className="text-base font-bold text-[#0D3547] mb-1 line-clamp-1">{name}</h3>
        <p className="text-[#4B5563] text-sm mb-2 line-clamp-2">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[#8B5E3C] font-extrabold text-lg tracking-tight">RWF {price.toLocaleString()}</span>
          <button className="inline-flex items-center gap-1 bg-[#0D3547] text-white px-3 py-1.5 rounded-lg shadow hover:bg-[#8B5E3C] hover:text-white transition font-semibold text-xs">
            View
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
