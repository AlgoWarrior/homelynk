import React from 'react';
import { ArrowUpRightIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  imageUrl?: string;
  name?: string;
  description?: string;
  price?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl = '', name = 'Unnamed product', description = '', price = 0 }) => (
  <article className="product-card">
    <div className="product-card__image">
      <img src={imageUrl} alt={name} loading="lazy" onError={event => { (event.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=700&q=80'; }} />
      <span className="product-card__tag">LOCAL FIND</span>
      <span className="product-card__heart"><HeartIcon className="h-5 w-5" /></span>
    </div>
    <div className="product-card__body">
      <div className="product-card__meta"><span>HOME & LIVING</span><span><MapPinIcon className="h-3.5 w-3.5" /> Rwanda</span></div>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="product-card__bottom"><strong>RWF {price.toLocaleString('en-US')}</strong><span>View details <ArrowUpRightIcon className="h-4 w-4" /></span></div>
    </div>
  </article>
);

export default ProductCard;