'use client';

import { useState } from "react";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Star, Heart } from "lucide-react";
import Link from 'next/link';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [stock, setStock] = useState(product.quantity ?? 10);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [favorite, setFavorite] = useState(false);

  const rating = 4;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the link from being triggered
    if (stock < quantityToAdd) return alert("Produto esgotado!");
    addToCart({ ...product, quantidade: quantityToAdd, selectedColor });
    setStock(stock - quantityToAdd);
  };

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

        <p className="text-gray-600 text-sm mb-1">Estoque: {stock}</p>

        <p className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
          {product.price.toLocaleString("pt-AO")} Kz
        </p>

        {product.colors && (
          <div className="flex gap-2 mb-3">
            {product.colors.map((c) => {
              const colorStyle =
                c.toLowerCase() === "preto"
                  ? "#000"
                  : c.toLowerCase() === "branco"
                  ? "#fff"
                  : c.toLowerCase() === "azul"
                  ? "#3b82f6"
                  : c.toLowerCase() === "marrom"
                  ? "#8b4513"
                  : c.toLowerCase();

              return (
                <button
                  key={c}
                  onClick={(e) => { e.stopPropagation(); setSelectedColor(c); }}
                  className={`w-6 h-6 rounded-full border-2 transition ${
                    selectedColor === c ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: colorStyle }}
                />
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-4 mb-4">
          <button onClick={(e) => { e.stopPropagation(); setQuantityToAdd(q => Math.max(1, q - 1)); }} className="bg-gray-200 px-3 py-1 rounded-lg">-</button>
          <span>{quantityToAdd}</span>
          <button onClick={(e) => { e.stopPropagation(); setQuantityToAdd(q => q + 1); }} className="bg-gray-200 px-3 py-1 rounded-lg">+</button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-blue-700 transition text-sm sm:text-base w-full sm:w-auto"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </Link>
  );
}