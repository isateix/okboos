"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
  title: "Ofertas Especiais",
  description: "Descontos que não voltam! Aproveite agora.",
  bg: "bg-purple-600",
  images: ["/images/papelaria.png", "/images/entrega.png"],
  type: "flex",
  textOffset: { top: 0, left: 0 },
  imageOffset: [
    { top: 0, left: 0, width: 500, height: 500 },
    { top: 120, left: 40, width: 150, height: 150 }
  ]
  },
  {
    id: 2,
    title: "Novidades da Semana",
    description: "Produtos exclusivos selecionados para você.",
    bg: "bg-orange-500",
    type: "flex",
    images: ["/images/2.png"],
    textOffset: { top: 0, left: 40 },
    imageOffset: [{ top: 0, left: 0, width: 500, height: 500 }],
  },
  // ... demais slides
  {
    id: 3,
    title: "Moda Masculina",
    description: "Ternos e sapatos sociais para homens de negócios.",
    bg: "bg-gray-800",
    type: "flex",
    images: ["/images/terno.png"],
    textOffset: { top: 0, left: 40 },
    imageOffset: [{ top: 0, left: 0, width: 500, height: 500 }],
  },
  {
    id: 4,
    title: "Material de Escritório",
    description: "Tudo para o seu escritório.",
    bg: "bg-blue-800",
    type: "flex",
    images: ["/images/escritorio2-removebg-preview.png"],
    textOffset: { top: 0, left: 40 },
    imageOffset: [{ top: 0, left: 0, width: 500, height: 500 }],
  },
  {
    id: 5,
    title: "Cozinha Equipada",
    description: "Equipamentos para a sua cozinha.",
    bg: "bg-green-800",
    type: "flex",
    images: ["/images/cozinha-removebg-preview.png"],
    textOffset: { top: 0, left: 40 },
    imageOffset: [{ top: 0, left: 0, width: 500, height: 500 }],
  },
  {
    id: 6,
    title: "Calçados Modernos",
    description: "Chinelos e sandálias para todos os gostos.",
    bg: "bg-yellow-800",
    type: "flex",
    images: ["/images/chinelas.jpg"],
    textOffset: { top: 0, left: 40 },
    imageOffset: [{ top: 0, left: 0, width: 500, height: 500 }],
  },
  {
    id: 7,
    title: "Roupas Femininas",
    description: "Vestidos e saltos para todas as ocasiões.",
    bg: "bg-pink-800",
    type: "flex",
    images: ["/images/vestido.png"],
    textOffset: { top: 0, left: 40 },
    imageOffset: [{ top: 0, left: 0, width: 500, height: 500 }],
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(Math.floor(Math.random() * slides.length));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className={`relative w-full h-[500px] overflow-hidden ${slide.bg}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-between px-12 text-white"
        >
          {/* Slide 1 com layout flex */}
          {slide.type === "flex" && (
            <div className="flex w-full h-full items-center justify-between px-12">
              {/* Texto à esquerda */}
              <div className="flex flex-col justify-center max-w-lg">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-2xl">{slide.description}</p>
              </div>

              {/* Imagens à direita */}
              <div className="flex flex-col gap-4 items-end">
                {slide.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative"
                    style={{
                      width: slide.imageOffset?.[idx]?.width ?? 500,
                      height: slide.imageOffset?.[idx]?.height ?? 500,
                      top: slide.imageOffset?.[idx]?.top ?? 0,
                      left: slide.imageOffset?.[idx]?.left ?? 0,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${slide.title} ${idx + 1}`}
                      fill
                      className="object-contain rounded-xl shadow-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Demais slides */}
          {slide.type !== "flex" && (
            <>
              <div
                className="absolute max-w-lg"
                style={{
                  top: `${slide.textOffset?.top ?? 0}px`,
                  left: `${slide.textOffset?.left ?? 0}px`,
                }}
              >
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-2xl mb-4">{slide.description}</p>
              </div>

              <div className="relative w-[500px] h-[500px]">
                {slide.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="absolute w-[500px] h-[500px]"
                    style={{
                      top: slide.imageOffset?.[idx]?.top ?? 0,
                      right: slide.imageOffset?.[idx]?.right ?? 0,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${slide.title} ${idx + 1}`}
                      fill
                      className="object-contain rounded-xl shadow-xl"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Botões de navegação */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-6xl hover:scale-110 transition-transform"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-6xl hover:scale-110 transition-transform"
      >
        ›
      </button>
    </section>
  );
}
