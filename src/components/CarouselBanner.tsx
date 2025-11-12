"use client";

import { useState } from "react";
import { Product } from "../types/Product";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

interface CarouselBannerProps {
  products: Product[];
}

export default function CarouselBanner({ products }: CarouselBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const { t } = useLanguage();

  if (products.length === 0) return null;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleVerMais = (id: string) => {
    router.push(`/produtos/${id}`);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  const currentProduct = products[currentIndex];

  // Ajuste da largura da imagem para mobile
  const imageWidth =
    currentProduct.id === "49"
      ? "w-[220px] md:w-[400px]"
      : "w-[180px] md:w-[320px]";

  return (
    <div className="bg-white w-full rounded-2xl shadow-md p-4 md:p-6 flex justify-center items-center">
      <div className="relative w-full h-[240px] md:h-[300px] rounded-lg overflow-hidden flex items-center bg-gray-100">

        {/* Texto do Carousel */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentProduct.id}
            className="absolute md:top-1/2 top-4 left-4 md:left-[20%] md:-translate-y-1/2 -translate-x-0 md:-translate-x-[10%] w-[90%] md:w-[40%] flex flex-col justify-start md:justify-center text-left text-gray-900"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-base md:text-2xl font-bold mb-1 md:mb-3">
              Aproveite o Black da OkBoss
            </p>
            <p className="text-sm md:text-xl mb-1 md:mb-2">
              Frete GRÁTIS para toda Luanda
            </p>
            <p className="text-sm md:text-xl mb-2 md:mb-4 font-semibold text-[#0071BC]">
              Até 30% de desconto em todos os produtos
            </p>

            {/* Botão Ver Mais */}
            
<button
  onClick={() => handleVerMais(currentProduct.id)}
  className="mt-20 md:mt-0 ml-[50px] md:ml-0 px-4 py-2 bg-[#0071BC] hover:bg-[#005f99] text-white font-semibold rounded transition text-sm md:text-base w-max"
>
  {t("carousel_see_more")}
</button>
          </motion.div>
        </AnimatePresence>

        {/* Imagem do Produto */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentProduct.image}
            className={`absolute md:top-1/2 top-[180px] left-[50%] md:left-[60%] -translate-y-1/2 md:-translate-y-1/2 ${imageWidth}`}

            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-auto object-contain drop-shadow-md"
            />
          </motion.div>
        </AnimatePresence>

        {/* Botões de Navegação */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-6xl md:text-7xl hover:text-gray-600 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-6xl md:text-7xl hover:text-gray-600 transition"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
