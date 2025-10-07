"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// 15 cards com imagens de 9.jpg a 23.jpg
const cards = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Produto ${i + 1}`,
  img: `/images/${9 + i}.jpg`, // 9.jpg, 10.jpg, ..., 23.jpg
}));

const Secao1: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(7);

  // Ajusta cards visíveis conforme tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setCardsPerView(7);
      else if (window.innerWidth >= 1024) setCardsPerView(6);
      else if (window.innerWidth >= 768) setCardsPerView(4);
      else setCardsPerView(2);

      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, cards.length - cardsPerView))
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Avança 1 card
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, cards.length - cardsPerView)
    );
  };

  // Volta 1 card
  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="-mt-16 pb-8 bg-green-100">
      <div className="relative px-4 overflow-hidden">
        {/* Botão recuar */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          ‹
        </button>

        {/* Cards */}
        <motion.div
          className="flex gap-3 transition-transform duration-300"
          style={{
            width: `${(cards.length / cardsPerView) * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
          }}
        >
          {cards.map((card) => (
            <div
  key={card.id}
  className="flex-shrink-0 flex flex-col items-center"
  style={{ width: `${100 / cardsPerView}%`, maxWidth: "150px" }}
>
  {/* Card com imagem ocupando todo o espaço */}
  <div className="w-full aspect-square rounded-md overflow-hidden relative">
    <Image
      src={card.img}
      alt={card.title}
      fill
      className="object-cover"
    />
  </div>
  {/* Título */}
  <p className="mt-1 text-gray-800 text-sm text-center">{card.title}</p>
</div>
          ))}
        </motion.div>

        {/* Botão avançar */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 disabled:opacity-50"
          disabled={currentIndex >= cards.length - cardsPerView}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Secao1;
