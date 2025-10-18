"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ------------------------------------------------------------------
// 1. DADOS DOS SLIDES (SLIDE 1 ATUALIZADO)
// ------------------------------------------------------------------

const slides = [
  {
    id: 1,
    // Deixei o texto aqui, mas ele será removido da renderização abaixo
    title: "CANTIS EM PROMOÇÃO!",
    description: "Compre o conjunto de 3 garrafas por apenas 6.000 Kz.",
    extra: "Ideal para o dia a dia — resistente, moderno e colorido. FRETE GRÁTIS!",
    // Cores exatas para simular o degrade
    gradientStart: "#7a2a9e",
    gradientEnd: "#c28af5",
    // IMPORTANTE: VOCÊ DEVE SUBSTITUIR ESTA URL PELA SUA IMAGEM REAL DO CANTIL COM FUNDO TRANSPARENTE
    images: ["/images/539.png"], 
    type: "flex",
    isPromoBanner: true,
    // NOVO: Adicionado um campo para o texto secundário (OkBoss em Promoção) que será removido
    promoHeader: "OkBoss em Promoção"
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
    extra:
      "Entrega grátis em todos os pedidos + Ofertas imperdíveis na OkBoos!",
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

// ------------------------------------------------------------------
// 2. COMPONENTE PRINCIPAL HERO CAROUSEL
// ------------------------------------------------------------------

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className={`relative w-full pt-[90px] md:pt-0 h-[500px] md:h-[450px] sm:h-[400px] overflow-hidden`}
      // Aplica o Fundo Degradê Apenas ao Slide 1
      style={{
        backgroundColor: slide.bg,
        background:
          slide.isPromoBanner && slide.id === 1 
            ? `linear-gradient(90deg, ${slide.gradientStart} 0%, ${slide.gradientEnd} 100%)`
            : slide.type !== "full-image" 
            ? slide.bg
            : undefined, 
      }}
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
              {/* SLIDE PROMOCIONAL EXATO (Cantil Roxo) */}
              {slide.id === 1 && slide.isPromoBanner ? (
                <>
                  {/* 1. TEXTO PROMO (ESQUERDA) - Ajustado para subir */}
                  <div className="absolute md:relative left-8 top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 max-w-[90%] md:max-w-[45%] text-left z-20 text-white 
                                  md:top-[15%]"> {/* NOVO: Ajusta o topo para 15% para subir o bloco de texto */}
                    {/* NOVO: Título "OkBoss em Promoção" na linha 1 */}
                    {/* Título "CANTIS EM PROMOÇÃO!" em uma linha, ajustado para caber */}
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-2 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        CANTIS EM PROMOÇÃO!
                    </h2>

                    <p className="text-lg lg:text-xl font-medium mb-3">
                      {slide.description}
                    </p>
                    <p className="text-base font-light italic">
                      {/* Você pode remover o .split() se o extra não tiver um ponto no meio */}
                      {slide.extra.split(". ")[0]} 
                    </p>
                    
                    {/* Selo/Etiqueta Frete Grátis com Ícone de Carro */}
                    <div className="mt-4 flex items-center bg-green-500 rounded-full w-fit px-4 py-2 shadow-lg">
                      <span className="text-white text-base font-bold mr-2">
                        FRETE GRÁTIS!
                      </span>
                      {/* Ícone de Carro (SVG) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-5 h-5"
                      >
                        <path d="M10 18a1 1 0 100-2 1 1 0 000 2zM19 18a1 1 0 100-2 1 1 0 000 2zM21 9V6H3v3h18zM3 11v6a3 3 0 003 3h13a1 1 0 001-1v-5H3z" />
                      </svg>
                    </div>
                  </div>

                  {/* 2. IMAGEM (DIREITA) - Configuração AINDA MAIOR e mais próxima do texto */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[500px] flex items-center justify-center z-10">
                    <Image
                      src={slide.images[0]} // Seu arquivo de imagem do cantil
                      alt={slide.title}
                      // AUMENTO MAIOR: Ajustado de 480x480 para 550x550
                      width={800}
                      height={800}
                      // AJUSTES: Mover mais para a esquerda e para cima para encostar no texto e centralizar melhor
                      className="object-contain max-h-[100%] max-w-[100%] transition-transform duration-500 ease-out 
                                 transform rotate-[-8deg] -translate-x-32 -translate-y-5" // Mantendo translate-x-32, e translate-y-5
                      priority
                    />
                  </div>
                </>
              ) : (
                // ------------------------------------------------------------------
                // LAYOUT DOS OUTROS SLIDES (Permanecem Inalterados)
                // ------------------------------------------------------------------
                <>
                  {/* Imagem (ajuste com customSize) */}
                  {slide.images && !slide.isDoubleImage && (
                    <div
                      className={`relative w-full flex justify-center items-center ${
                        slide.customSize
                          ? "h-[450px]"
                          : "md:w-[48%] h-[240px] sm:h-[300px] md:h-[400px]"
                      }`}
                    >
                      <Image
                        src={slide.images[0]}
                        alt={slide.title}
                        width={1200}
                        height={450}
                        className={`object-contain ${
                          slide.customSize
                            ? "max-h-[450px] w-auto h-auto"
                            : "rounded-xl shadow-xl"
                        }`}
                        priority
                      />
                    </div>
                  )}

                  {/* Duas imagens (caso de Beleza Que Encanta) */}
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

                  {/* Texto */}
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
                </>
              )}
            </div>
          )}

          {/* Full Image Slide (Slide 3) */}
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

      {/* Botões de navegação */}
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