"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from '../../../data/products';
import { useCart } from "../../../context/CartContext";
import { useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) return <p>Produto não encontrado</p>;

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

  const handleAddToCart = () => {
    addToCart({ ...product, quantidade: 1 });
    setAdded(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">

      {/* Produto principal */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-lg shadow-md">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 object-contain" />
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-[#0071BC]">{product.name}</h1>
          <p className="text-xl text-gray-700">{product.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Estrelas de avaliação */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
          </div>

          {/* Botão adicionar ao carrinho */}
          <button
            onClick={handleAddToCart}
            className="mt-auto bg-[#0071BC] text-white px-4 py-2 rounded-lg hover:bg-[#005fa3] transition"
          >
            Adicionar ao Carrinho
          </button>

          {/* Mensagem produto adicionado */}
          {added && (
            <div className="mt-3 p-3 bg-green-100 text-green-800 rounded-lg flex flex-col md:flex-row gap-3 items-center justify-between">
              <p>Você adicionou <strong>{product.name}</strong> ao seu carrinho!</p>
              <button
                onClick={() => router.push("/carrinho")}
                className="bg-[#0071BC] text-white px-4 py-2 rounded-lg hover:bg-[#005fa3] transition"
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Produtos relacionados */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-[#0071BC] mb-4">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <div key={p.id} className="flex flex-col shadow-lg bg-white p-2 rounded-lg">
                <img src={p.image} alt={p.name} className="object-contain w-full h-24 mb-2" />
                <p className="text-sm truncate">{p.name}</p>
                <p className="text-sm text-[#0071BC]">{p.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</p>
                <button
                  onClick={() => router.push(`/produtos/${p.id}`)}
                  className="mt-2 bg-[#0071BC] text-white px-2 py-1 rounded hover:bg-[#005fa3] text-sm"
                >
                  Ver Mais
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
