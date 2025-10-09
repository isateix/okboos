"use client";

import { useState } from "react";
import { Product } from "../data/products";
import { Star, Heart } from "lucide-react";
import Link from 'next/link';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [favorite, setFavorite] = useState(false);

  const rating = 4;

  return (
    <Link href={`/produtos/${product.id}`}>
      <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col items-center text-center p-4 cursor-pointer">
        <button onClick={(e) => { e.stopPropagation(); setFavorite(!favorite); }} className="absolute top-2 right-2">
          <Heart
            size={22}
            className={favorite ? "text-red-500 fill-red-500" : "text-gray-400"}
          />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-900">{product.name}</h3>

        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
            />
          ))}
        </div>

        {product.description && (
          <p className="text-gray-700 text-sm sm:text-base mb-2">{product.description}</p>
        )}

        <p className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-gray-500 line-through mr-2">
              {product.originalPrice.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
            </span>
          )}
          <span className="text-red-600">
            {product.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
          </span>
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="ml-2 text-green-600 font-bold">
              -{product.discountPercentage}%
            </span>
          )}
        </p>

        {/* Removed color selection from ProductCard */}

        {/* Removed quantity controls from ProductCard */}

        <button
          className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-blue-700 transition text-sm sm:text-base w-full sm:w-auto cursor-pointer"
        >
          Ver Mais Detalhes
        </button>
      </div>
    </Link>
  );
}