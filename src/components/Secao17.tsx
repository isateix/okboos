"use client";

import { useState, useEffect } from "react";
import { produtos } from "../data/products";

export default function Secao17() {
  const [startIndex, setStartIndex] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(5);

  const idsSelecionados = ["38", "39", "40", "41", "42", "43"];
  const produtosFiltrados = produtos.filter((p) =>
    idsSelecionados.includes(p.id)
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItensPorPagina(1); // mobile
      else if (window.innerWidth < 1024) setItensPorPagina(2); // tablet
      else setItensPorPagina(5); // desktop
    };

    handleResize(); // inicial
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

  return (
    <section className="my-16 p-6 bg-transparent w-full relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-left text-pink-700 ml-10">
        Beleza & Cuidados
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Botão anterior */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-2xl font-bold"
        >
          &lt;
        </button>

        {/* Produtos visíveis */}
        <div className="flex gap-10 justify-center w-full">
          {produtosVisiveis.map((produto) => (
            <div
              key={produto.id}
              className="relative w-56 h-60 flex flex-col items-center justify-end mx-auto"
            >
              {/* Círculo translúcido */}
              <div className="absolute top-0 w-48 h-48 rounded-full bg-pink-200/30 backdrop-blur-md border border-pink-300/40 flex items-center justify-center">
                <img
                  src={produto.image}
                  alt={produto.name}
                  className="w-32 h-32 object-contain drop-shadow-lg"
                />
              </div>

              {/* Nome do produto */}
              <span className="mt-[190px] text-center text-base font-medium text-gray-900 px-2 leading-snug">
                {produto.name}
              </span>
            </div>
          ))}
        </div>

        {/* Botão próximo */}
        <button
          onClick={handleNext}
          disabled={startIndex + itensPorPagina >= produtosFiltrados.length}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-2xl font-bold"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
