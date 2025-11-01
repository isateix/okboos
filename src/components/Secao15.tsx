"use client";

import { useState, useEffect } from "react";
import { produtos } from "../data/products";

export default function Secao15() {
  const idsSelecionados = ["48", "49", "50", "51", "52", "53", "54"];
  const produtosSelecionados = produtos.filter((p) =>
    idsSelecionados.includes(p.id)
  );

  const [startIndex, setStartIndex] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(4); // padrão desktop

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItensPorPagina(1); // Mobile
      else if (window.innerWidth < 1024) setItensPorPagina(2); // Tablet
      else setItensPorPagina(4); // Desktop
    };

    handleResize(); // inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const endIndex = startIndex + itensPorPagina;
  const produtosVisiveis = produtosSelecionados.slice(startIndex, endIndex);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itensPorPagina, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + itensPorPagina, produtosSelecionados.length - itensPorPagina)
    );
  };

  return (
    <section className="my-16 p-8 bg-white w-full relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-center text-blue-900">
        Tecnologia & Acessórios
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Botão anterior */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-2xl font-bold"
        >
          &lt;
        </button>

        {/* Produtos visíveis */}
        <div className="flex gap-8 justify-center w-full">
          {produtosVisiveis.map((produto) => (
            <div
              key={produto.id}
              className="flex flex-col items-center w-64 h-[360px] rounded-xl bg-gray-50 shadow-md hover:shadow-xl transition-all duration-300 p-5"
            >
              <div className="w-full h-48 flex items-center justify-center bg-white rounded-lg overflow-hidden mb-4">
                <img
                  src={produto.image}
                  alt={produto.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="text-lg text-center font-semibold text-gray-800 mb-2">
                {produto.name}
              </span>
              <button className="mt-auto bg-blue-900 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-800 transition">
                Comprar agora
              </button>
            </div>
          ))}
        </div>

        {/* Botão próximo */}
        <button
          onClick={handleNext}
          disabled={startIndex + itensPorPagina >= produtosSelecionados.length}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-2xl font-bold"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
