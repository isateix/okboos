"use client";

import { useState, useEffect } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Secao17() {
  const { addToCart } = useCart(); // ✅ Contexto do carrinho
  const [startIndex, setStartIndex] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(5);

  const idsSelecionados = [
    "2","3","4","21","22","23","27","28","29","38","39","63","68","72","73","74","78"
  ];

  const produtosFiltrados = products.filter((p) =>
    idsSelecionados.includes(p.id)
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItensPorPagina(1);
      else if (window.innerWidth < 1024) setItensPorPagina(2);
      else setItensPorPagina(5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const endIndex = startIndex + itensPorPagina;
  const produtosVisiveis = produtosFiltrados.slice(startIndex, endIndex);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itensPorPagina, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + itensPorPagina, produtosFiltrados.length - itensPorPagina)
    );
  };

  const handleAddToCart = (produto: any) => {
    addToCart({
      id: produto.id,
      name: produto.name,
      price: produto.price,
      image: produto.image,
      quantidade: 1,
      selectedColor: produto.selectedColor || "",
    });
  };

  return (
    <section className="my-10 p-4 bg-transparent w-full relative overflow-hidden">
      {/* Título da seção */}
      <h2 className="text-2xl font-bold mb-6 text-left text-gray-800 ml-4">
        Calçado
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Botão anterior */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-xl font-bold"
        >
          &lt;
        </button>

        {/* Produtos visíveis */}
        <div className="flex gap-6 justify-center w-full">
          {produtosVisiveis.map((produto) => (
            <div
              key={produto.id}
              className="relative w-48 h-56 flex flex-col items-center justify-end mx-auto"
            >
              {/* Círculo translúcido maior com cor neutra */}
              <div className="absolute top-0 w-40 h-40 rounded-full bg-gray-200/50 backdrop-blur-md border border-gray-400 flex items-center justify-center">
                <img
                  src={produto.image}
                  alt={produto.name}
                  className="w-28 h-28 object-contain drop-shadow-lg"
                />
              </div>

              {/* Nome do produto */}
              <span className="mt-[200px] text-center text-sm font-medium text-gray-900 px-1 leading-snug">
                {produto.name}
              </span>

              {/* Botão Comprar com adicionar ao carrinho */}
              <button
                onClick={() => handleAddToCart(produto)}
                className="mt-2 px-3 py-1 bg-[#0071BC] text-white text-sm rounded-lg hover:bg-[#005fa3] transition"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>

        {/* Botão próximo */}
        <button
          onClick={handleNext}
          disabled={startIndex + itensPorPagina >= produtosFiltrados.length}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-xl font-bold"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
