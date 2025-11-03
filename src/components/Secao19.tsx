"use client";

import { useState, useEffect } from "react";
import { products, Product } from "../data/products"; // ✅ Caminho correto e padronizado

export default function Secao19() {
  const [startIndex, setStartIndex] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItensPorPagina(1); // Mobile
      else if (window.innerWidth < 1024) setItensPorPagina(2); // Tablet
      else setItensPorPagina(5); // Desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const endIndex = startIndex + itensPorPagina;
  const produtosVisiveis = products.slice(startIndex, endIndex); // ✅ corrigido

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itensPorPagina, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + itensPorPagina, products.length - itensPorPagina) // ✅ corrigido
    );
  };

  return (
    <section className="my-16 p-6 bg-gray-100 w-full relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Perfeito para Sua Cozinha!
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Botão anterior */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-2xl font-bold"
        >
          &lt;
        </button>

        {/* Produtos visíveis */}
        <div
          className={`flex gap-8 justify-center`}
          style={{
            width: `${itensPorPagina * 20}rem`,
            maxWidth: "100%",
          }}
        >
          {produtosVisiveis.map((produto) => (
            <div
              key={produto.id}
              className="flex flex-col items-center w-64 h-64 border border-transparent rounded-lg p-5 bg-white"
            >
              <div className="w-full h-44 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                <img
                  src={produto.image}
                  alt={produto.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span
                className="text-lg mt-4 text-center font-medium overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {produto.name}
              </span>
            </div>
          ))}
        </div>

        {/* Botão próximo */}
        <button
          onClick={handleNext}
          disabled={startIndex + itensPorPagina >= products.length} // ✅ corrigido
          className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-2xl font-bold"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
