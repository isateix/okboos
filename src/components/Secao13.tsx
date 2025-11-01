"use client";

import { useState } from "react";
import { produtos } from "../data/products";

export default function Secao13() {
  const [startIndex, setStartIndex] = useState(0);
  const itensPorPagina = 5;

  // ✅ IDs dos produtos (60 a 68)
  const idsSelecionados = ["60", "61", "62", "63", "64", "65", "66", "67", "68"];
  const produtosFiltrados = produtos.filter((p) =>
    idsSelecionados.includes(p.id)
  );

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
      {/* 🟢 Título da seção */}
      <h2 className="text-3xl font-bold mb-10 text-left text-green-700 ml-10">
        Tendências Modernas
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Botão anterior */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-2xl font-bold"
        >
          &lt;
        </button>

        {/* Produtos visíveis */}
        <div className="flex gap-10 overflow-hidden justify-center w-full">
          {produtosVisiveis.map((produto) => (
            <div
              key={produto.id}
              className="relative w-56 h-60 flex flex-col items-center justify-end"
            >
              {/* 🟢 Círculo translúcido verde */}
              <div className="absolute top-0 w-48 h-48 rounded-full bg-green-200/30 backdrop-blur-md border border-green-300/40 flex items-center justify-center">
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
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 transition z-10 text-2xl font-bold"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
