"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const Secao2 = () => {
  const { t } = useLanguage();

  const imagens = [
    { src: "/images/amostra.jpg", texto: t("secao2_card1") },
    { src: "/images/fabrica.jpg", texto: t("secao2_card2") },
    { src: "/images/fornecedor.jpg", texto: t("secao2_card3") },
  ];

  return (
    <section className="w-full bg-white py-16 px-5 sm:px-8 md:px-16 text-center md:text-left">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12 md:mb-14"
      >
        {t("secao2_title")}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {imagens.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl shadow-lg md:shadow-xl"
          >
            <img
              src={item.src}
              alt={item.texto}
              className="w-full h-[280px] sm:h-[340px] md:h-[400px] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/45 flex items-end justify-center md:justify-start p-6 sm:p-8">
              <p className="text-white text-xl sm:text-2xl font-semibold leading-snug max-w-[85%]">
                {item.texto}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Secao2;
