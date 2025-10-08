"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { products } from '../../../data/products';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';
import ProductCard from '../../../components/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () => {
    addToCart({ ...product, quantidade: quantity, selectedColor });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">{product.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</p>
          <p className="text-gray-600 mb-8">{product.description || 'Sem descrição'}</p>
          
          {product.colors && (
            <div className="flex gap-2 mb-4">
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
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      selectedColor === c ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: colorStyle }}
                  />
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 px-4 py-2 rounded-lg">-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 px-4 py-2 rounded-lg">+</button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
