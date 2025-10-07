"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Ofertas Especiais",
    description: "Aproveite os melhores descontos antes que acabem!",
    bg: "bg-purple-600",
    video: "/images/20.mp4",
    icon: "/images/entrega.png",
    type: "flex",
  },
  {
    id: 2,
    title: "Novidades da Semana",
    description: "Produtos exclusivos selecionados para você.",
    bg: "bg-orange-500",
    images: ["/images/2.png", "/images/entrega.png"],
    type: "flex",
  },
  // ... demais slides
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className={`relative w-full h-[500px] md:h-[450px] sm:h-[400px] overflow-hidden ${slide.bg}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-start md:items-center px-6 md:px-12 text-white"
        >
          <div className="flex flex-col md:flex-row w-full h-full items-start md:justify-start gap-4 md:gap-8">
            {/* Texto */}
            <div className="flex flex-col justify-start max-w-lg text-left mt-12 md:mt-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-4">{slide.description}</p>
              {slide.icon && (
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src={slide.icon}
                    alt="Transporte Grátis"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                  <span className="text-lg md:text-xl font-semibold">Entrega Grátis em todos os pedidos!</span>
                </div>
              )}
            </div>

            {/* Vídeo */}
            {slide.video && (
              <div className="flex flex-col items-end md:items-end mt-8 md:mt-12">
                <video
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  className="w-[280px] md:w-[320px] h-[180px] md:h-[220px] rounded-xl shadow-xl object-cover"
                />
              </div>
            )}

            {/* Imagens para outros slides */}
            {!slide.video && slide.images && (
              <div className="flex flex-col items-center md:items-end" style={{ gap: "0.8rem" }}>
                <div className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] relative">
                  <Image
                    src={slide.images[0]}
                    alt={slide.title}
                    fill
                    className="object-contain rounded-xl shadow-xl"
                  />
                </div>
                <div className="w-[80px] md:w-[100px] h-[80px] md:h-[100px] relative -mt-4 md:-mt-6">
                  <Image
                    src={slide.images[1]}
                    alt="Transporte Grátis"
                    fill
                    className="object-contain rounded-xl shadow-xl"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Botões de navegação */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl hover:scale-110 transition-transform"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl hover:scale-110 transition-transform"
      >
        ›
      </button>
    </section>
  );
}
