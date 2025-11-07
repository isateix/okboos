'use client';

import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700">
        {product.price.toLocaleString('pt-PT', { style: 'currency', currency: 'AOA' })}
      </p>
    </div>
  );
}
