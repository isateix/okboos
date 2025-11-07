"use client";

import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { products, Product } from "../../data/products";

export default function MateriaisEmbalagem() {
  const { addToCart } = useCart();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Materiais de Embalagem</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="font-semibold text-lg mb-1">{product.name}</h2> {/* 👈 trocado */}
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="font-bold text-blue-600 mb-2">
              R$ {product.price.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
