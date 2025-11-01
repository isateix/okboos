"use client";

import { useState, useEffect } from "react";
import { produtos } from "../data/products";

export default function Secao9() {
  const [startIndex, setStartIndex] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(5);

  const idsSelecionados = ["144","145","146","147","148","149","150"];
  const produtosFiltrados = produtos.filter((p) =>
    idsSelecionados.includes(p.id)
  );

  // Ajusta quantidade de itens visíveis conforme a tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItensPorPagina(1); // mobile
      else if (window.innerWidth < 1024) setItensPorPagina(2); // tablet
      else setItensPorPagina(5); // desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const endIndex = startIndex + itensPorPagina;
  const produtosVisiveis = produtosFiltrados.slice(startIndex, endIndex);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev - 1 < 0 ? produtosFiltrados.length - itensPorPagina : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 1 >= produtosFiltrados.length ? 0 : prev + 1
    );
  };

  // Swipe para mobile/tablet
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].screenX);
    if (touchStartX - touchEndX > 50) handleNext();
    else if (touchEndX - touchStartX > 50) handlePrev();
  };

  // Avanço automático a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [startIndex, itensPorPagina]);

  return (
    <section className="my-16 p-6 bg-purple-50 w-full relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-left text-purple-700 ml-10">
        Roupas
      </h2>

      <div
        className="relative flex items-center justify-center w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Botão anterior */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition z-10 text-2xl font-bold"
        >
          &lt;
        </button>

        {/* Produtos visíveis */}
        <div className="flex gap-10 justify-center w-full">
          {produtosVisiveis.map((produto) => (
            <div
              key={produto.id}
              className="relative flex-none flex flex-col items-center justify-start w-56 sm:w-56 md:w-56"
            >
              {/* Círculo translúcido */}
              <div className={`rounded-full bg-purple-200/30 backdrop-blur-md border border-purple-300/40 flex items-center justify-center
                ${itensPorPagina === 1 ? "w-60 h-60" : itensPorPagina === 2 ? "w-52 h-52" : "w-48 h-48"}`}>
                <img
                  src={produto.image}
                  alt={produto.name}
                  className={`object-contain drop-shadow-lg
                    ${itensPorPagina === 1 ? "w-44 h-44" : itensPorPagina === 2 ? "w-36 h-36" : "w-32 h-32"}`}
                />
              </div>

              {/* Nome do produto abaixo do círculo */}
              <span className="mt-4 text-center text-base font-medium text-gray-900 px-2 leading-snug">
                {produto.name}
              </span>
            </div>
          ))}
        </div>

        {/* Botão próximo */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition z-10 text-2xl font-bold"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
