"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Conectamos Angola ao mundo!",
    description: "Venda e importação de produtos de qualidade.",
    bg: "#FFFFFF",
    images: ["/images/admiracao.png"],
    type: "flex",
  },
  {
    id: 2,
    title: "Venda e Importação Inteligente",
    description:
      "A OkBoos importa e comercializa produtos com excelência — rapidez, garantia e preço justo.",
    extra: "Do fornecedor até você, sem complicações.",
    bg: "#4B0082",
    video: "/images/20.mp4",
    type: "flex",
  },
  {
    id: 3,
    title: "Ofertas Especiais",
    description: "Aproveite os melhores descontos antes que acabem!",
    extra: "Entrega grátis em todos os pedidos + Ofertas imperdíveis na OkBoos!",
    bg: "#FF914D",
    images: ["/images/promo.png"],
    type: "full-image",
  },
  {
    id: 4,
    title: "Seu Escritório Sempre Pronto",
    description:
      "Papéis, canetas, pastas e muito mais para facilitar o seu dia a dia.",
    extra: "Frete grátis em todos os pedidos de escritório!",
    bg: "#FF914D",
    images: ["/images/25.png"],
    type: "flex",
  },
  {
    id: 5,
    title: "Estilo Que Inspira",
    description: "",
    extra:
      "Moda Masculina • Moda Feminina • Moda Infantil | Descontos imperdíveis até 50% nesta coleção.",
    bg: "#FFFFFF",
    images: ["/images/34.png"],
    type: "flex",
  },
  {
    id: 6,
    title: "Cozinha Equipada",
    description: "Utensílios e equipamentos para a sua cozinha.",
    extra: "Descontos especiais para chefs e famílias.",
    bg: "#2E7D32",
    images: ["/images/27.png"],
    type: "flex",
  },
  {
    id: 7,
    title: "Beleza Que Encanta",
    description:
      "Perfumes, cosméticos e cuidados pessoais de marcas que você adora.",
    extra: "Oferta especial para os nossos melhores clientes.",
    bg: "#F48FB1",
    images: ["/images/35.png", "/images/36.png"],
    type: "flex",
    isDoubleImage: true,
  },
  {
    id: 8,
    title: "Tecnologia para o Seu Lar",
    description: "Dos pequenos eletros até os indispensáveis do dia a dia.",
    extra: "Promoções exclusivas + entrega grátis garantida!",
    bg: "#1565C0",
    images: ["/images/40.png"],
    type: "flex",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className={`relative w-full pt-[90px] md:pt-0 h-[500px] md:h-[450px] sm:h-[400px] overflow-hidden`}
      style={{ backgroundColor: slide.bg }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Flex Slides */}
          {slide.type === "flex" && (
            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-8 gap-4">
              
              {/* Imagem */}
              {slide.images && !slide.isDoubleImage && (
                <div className="relative w-full md:w-[48%] h-[240px] sm:h-[300px] md:h-[400px]">
                  <Image
                    src={slide.images[0]}
                    alt={slide.title}
                    fill
                    className="object-contain rounded-xl shadow-xl"
                  />
                </div>
              )}

              {slide.images && slide.isDoubleImage && (
                <div className="flex flex-row gap-4 md:gap-6 items-center relative z-10">
                  {slide.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-[140px] sm:w-[180px] md:w-[220px] h-[140px] sm:h-[180px] md:h-[220px]"
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

              {/* Vídeo */}
              {slide.video && (
                <div className="flex justify-center items-center w-full md:w-[48%] h-full">
                  <video
                    src={slide.video}
                    autoPlay
                    loop
                    muted
                    className="w-full md:w-[550px] h-[260px] md:h-[340px] rounded-2xl shadow-2xl object-cover"
                  />
                </div>
              )}

              {/* Texto sobreposto */}
              <div className="absolute md:relative left-4 md:left-auto md:right-0 top-10 md:top-1/4 max-w-[90%] md:max-w-[48%] text-left z-20">
                <h2
                  className={`text-3xl md:text-4xl font-extrabold mb-2 leading-tight ${
                    slide.bg === "#FFFFFF" ? "text-gray-800" : "text-white"
                  }`}
                >
                  {slide.title}
                </h2>
                {slide.description && (
                  <p
                    className={`text-lg md:text-xl font-medium ${
                      slide.bg === "#FFFFFF" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    {slide.description}
                  </p>
                )}
                {slide.extra && (
                  <p
                    className={`mt-2 ${
                      slide.bg === "#FFFFFF" ? "text-gray-700" : "text-gray-200"
                    }`}
                  >
                    {slide.extra}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Full Image Slide */}
          {slide.type === "full-image" && slide.images && (
            <div className="absolute inset-0">
              <Image
                src={slide.images[0]}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/30 p-4 md:p-8 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-2">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl">{slide.description}</p>
                {slide.extra && (
                  <p className="text-sm md:text-lg mt-2">{slide.extra}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Botões */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-black text-4xl md:text-6xl hover:scale-110 transition-transform z-30"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-black text-4xl md:text-6xl hover:scale-110 transition-transform z-30"
      >
        ›
      </button>
    </section>
  );
}
