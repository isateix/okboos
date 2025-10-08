"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Ofertas Especiais",
    description: "Aproveite os melhores descontos antes que acabem!",
    extra: "Entrega grátis em todos os pedidos.",
    bg: "bg-purple-600",
    video: "/images/20.mp4",
    type: "flex",
  },
  {
    id: 2,
    title: "Embale com Segurança",
    description:
      "Sacos, caixas e fitas para manter os seus produtos sempre protegidos.",
    extra: "Oferta exclusiva para os nossos melhores clientes.",
    bg: "bg-orange-500",
    images: ["/images/21.png"],
    type: "flex",
  },
  {
    id: 3,
    title: "Seu Escritório Sempre Pronto",
    description:
      "Papéis, canetas, pastas e muito mais para facilitar o seu dia a dia.",
    extra: "Frete grátis em todos os pedidos de escritório!",
    bg: "bg-red-900",
    images: ["/images/25.png"],
    type: "flex",
  },
  {
    id: 4,
    title: "Estilo Que Inspira",
    description: "Roupas, sapatos e acessórios para todas as ocasiões.",
    extra: "Moda Masculina • Moda Feminina • Moda Infantil | Descontos imperdíveis até 50% nesta coleção.",
    bg: "bg-white",
    images: ["/images/34.png"],
    type: "flex",
  },
  {
    id: 5,
    title: "Cozinha Equipada",
    description: "Utensílios e equipamentos para a sua cozinha.",
    extra: "Descontos especiais para chefs e famílias.",
    bg: "bg-green-800",
    images: ["/images/27.png"],
    type: "flex",
  },
  {
    id: 6,
    title: "Beleza Que Encanta",
    description: "Perfumes, cosméticos e cuidados pessoais de marcas que você adora.",
    extra: "Oferta especial para os nossos melhores clientes.",
    bg: "bg-pink-600",
    images: ["/images/35.png", "/images/36.png"], // duas imagens
    type: "flex",
    isDoubleImage: true, // flag para renderizar duas imagens
  },
  {
    id: 7,
    title: "Tecnologia para o Seu Lar",
    description: "Dos pequenos eletros até os indispensáveis do dia a dia.",
    extra: "Promoções exclusivas + entrega grátis garantida!",
    bg: "bg-blue-700",
    images: ["/images/40.png"], // eletrodomésticos
    type: "flex",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const containerClasses =
    "flex flex-col md:flex-row w-full h-full items-center justify-center gap-6 md:gap-10 transform -translate-y-12";

  return (
    <section
      className={`relative w-full h-[500px] md:h-[450px] sm:h-[400px] overflow-hidden ${slide.bg}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 px-6 md:px-12 ${
            slide.bg === "bg-white" ? "text-black" : "text-white"
          }`}
        >
          {/* Slide tipo "flex" */}
          {slide.type === "flex" && (
            <div className={containerClasses}>
              {/* Texto */}
              <div className="flex flex-col justify-center max-w-lg text-left relative z-10">
                <h2 className="text-4xl md:text-5xl mb-2">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-2">{slide.description}</p>
                {slide.extra && (
                  <span className="text-md md:text-lg">{slide.extra}</span>
                )}
              </div>

              {/* Vídeo */}
              {slide.video && (
                <div className="flex flex-col items-center md:items-end mt-6 md:mt-10 relative z-10">
                  <video
                    src={slide.video}
                    autoPlay
                    loop
                    muted
                    className="w-[260px] md:w-[300px] h-[160px] md:h-[200px] rounded-xl shadow-xl object-cover"
                  />
                </div>
              )}

              {/* Imagens */}
              {slide.images && !slide.isDoubleImage && (
                <div className="flex flex-col items-center md:items-end relative z-10">
                  <div
                    className={`relative ${
                      slide.id === 3 || slide.id === 5 || slide.id === 7
                        ? "w-[450px] md:w-[600px] h-[320px] md:h-[420px]" // tamanho grande para 3, 5 e 7
                        : slide.id === 4
                        ? "w-[320px] md:w-[420px] h-[280px] md:h-[360px]" // especial para slide 4
                        : "w-[200px] md:w-[250px] h-[200px] md:h-[250px]"
                    }`}
                  >
                    <Image
                      src={slide.images[0]}
                      alt={slide.title}
                      fill
                      className="object-contain rounded-xl shadow-xl"
                    />
                  </div>
                </div>
              )}

              {/* Duas imagens (Slide 6) */}
              {slide.images && slide.isDoubleImage && (
                <div className="flex flex-row gap-6 md:gap-10 items-center relative z-10">
                  {slide.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-[180px] md:w-[220px] h-[180px] md:h-[220px]"
                    >
                      <Image
                        src={img}
                        alt={`${slide.title} - ${idx}`}
                        fill
                        className="object-contain rounded-xl shadow-xl"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Botões */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl hover:scale-110 transition-transform z-20"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl hover:scale-110 transition-transform z-20"
      >
        ›
      </button>
    </section>
  );
}
