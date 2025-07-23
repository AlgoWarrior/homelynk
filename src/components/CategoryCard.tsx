import React from 'react';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl }) => {
  return (
    <a
      href={`/products?category=${encodeURIComponent(title)}`}
      className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 group"
    >
      <img
        src={imageUrl}
        alt={`${title} category`}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 "></div>
      <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-[#D4AF37] transition">
        {title}
      </h3>
    </a>
  );
};

export default CategoryCard;
