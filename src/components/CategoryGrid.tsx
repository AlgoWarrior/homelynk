import React from 'react';
import CategoryCard from './CategoryCard';

const categories = [
  {
    title: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D',
  },
  {
    title: 'Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlZHJvb218ZW58MHx8MHx8fDA%3D',
  },
  {
    title: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1705909770198-7e83c24e1616?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8',
  },
  {
    title: 'Outdoor',
    imageUrl: 'https://images.unsplash.com/photo-1618106564892-b5202ed366f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG91dGRvb3IlMjBmdXJuaXR1cmV8ZW58MHx8MHx8fDA%3D',
  },
  {
    title: 'Custom Made',
    imageUrl: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VzdG9tJTIwbWFkZSUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  },
];

const CategoryGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-[#0F766E] mb-8 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
