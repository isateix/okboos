"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

interface ImageSet {
  top: string;
  bottom: string[];
}

const allImageSets: ImageSet[][] = [
  // Card 1
  [
    {
      top: "/images/601.jpg",
      bottom: ["/images/600.png", "/images/602.png", "/images/603.png"],
    },
    {
      top: "/images/604.jpg",
      bottom: ["/images/605.png", "/images/608.png", "/images/607.png"],
    },
    {
      top: "/images/611.jpg",
      bottom: ["/images/609.png", "/images/610.png", "/images/612.png"],
    },
    {
      top: "/images/613.jpg",
      bottom: ["/images/614.png", "/images/615.png", "/images/616.png"],
    },
  ],
  // Card 2
  [
    {
      top: "/images/620.jpg",
      bottom: ["/images/617.png", "/images/618.png", "/images/619.png"],
    },
    {
      top: "/images/621.jpg",
      bottom: ["/images/622.png", "/images/623.png", "/images/624.png"],
    },
    {
      top: "/images/627.jpg",
      bottom: ["/images/625.png", "/images/626.png", "/images/628.png"],
    },
    {
      top: "/images/632.jpg",
      bottom: ["/images/629.png", "/images/630.png", "/images/631.png"],
    },
  ],
  // Card 3
  [
    {
      top: "/images/639.jpg",
      bottom: ["/images/638.png", "/images/640.png", "/images/641.png"],
    },
    {
      top: "/images/634.jpg",
      bottom: ["/images/633.png", "/images/635.png", "/images/637.png"],
    },
    {
      top: "/images/645.jpg",
      bottom: ["/images/642.png", "/images/643.png", "/images/644.png"],
    },
    {
      top: "/images/647.jpg",
      bottom: ["/images/646.png", "/images/649.png", "/images/648.png"],
    },
  ],
];

const MultiCardShowcase: React.FC = () => {
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [hovered, setHovered] = useState<number | null>(null);
  const { t } = useLanguage();

  const handleNext = (cardIndex: number) => {
    setIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[cardIndex] = (newIndexes[cardIndex] + 1) % allImageSets[cardIndex].length;
      return newIndexes;
    });
  };

  const handlePrev = (cardIndex: number) => {
    setIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[cardIndex] =
        (newIndexes[cardIndex] - 1 + allImageSets[cardIndex].length) %
        allImageSets[cardIndex].length;
      return newIndexes;
    });
  };

  // Troca automática de imagens
  useEffect(() => {
    if (hovered === null) return;
    const interval = setInterval(() => handleNext(hovered), 15000);
    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <section className="w-full bg-gray-100 py-16 px-6 md:px-16">
      {/* Texto de destaque */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          {t("multiCard.title")}
        </h2>
        <p className="text-lg text-orange-600 mt-3 font-semibold">
          {t("multiCard.subtitle")}
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {allImageSets.map((sets, cardIndex) => {
          const current = sets[indexes[cardIndex]];
          return (
            <div
              key={cardIndex}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl"
              onMouseEnter={() => setHovered(cardIndex)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Botões */}
              <button
                onClick={() => handlePrev(cardIndex)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-gray-200 z-20"
              >
                <FaChevronLeft className="text-gray-700 w-4 h-4" />
              </button>
              <button
                onClick={() => handleNext(cardIndex)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-gray-200 z-20"
              >
                <FaChevronRight className="text-gray-700 w-4 h-4" />
              </button>

              {/* Imagens */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={indexes[cardIndex]}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col h-full"
                >
                  {/* Imagem principal */}
                  <div className="w-full h-[220px] sm:h-[240px] overflow-hidden">
                    <img
                      src={current.top}
                      alt={`Imagem principal ${cardIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 3 Imagens inferiores */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 bg-white flex-1">
                    {current.bottom.map((img, i) => (
                      <div
                        key={i}
                        className="w-full h-[100px] sm:h-[120px] overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all duration-300"
                      >
                        <img
                          src={img}
                          alt={`Imagem secundária ${i + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MultiCardShowcase;
