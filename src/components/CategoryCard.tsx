import React from 'react';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl }) => {
  return (
    <a
      href={`/products?category=${encodeURIComponent(title)}`}
      className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 group min-h-[220px] flex items-end"
    >
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={`${title} category`}
          className="w-full h-full object-cover object-center min-h-[220px] max-h-[220px] transition group-hover:scale-105 rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <h3 className="relative z-10 p-4 text-white text-xl font-bold group-hover:text-[#D4AF37] transition drop-shadow-lg">
        {title}
      </h3>
    </a>
  );
};

export default CategoryCard;
