"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Factory } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Secao3 = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-20 px-5 md:py-28 md:px-16 overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <img
          src="/images/telefonar.png"
          alt={t("secao3_background_alt")}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Degradê translúcido */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b5e3c]/70 via-[#a87550]/65 to-[#c68a64]/60"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-10 md:gap-14 text-white text-center md:text-left">
        {/* Título principal */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold leading-snug md:leading-tight md:w-[70%] mx-auto md:mx-0"
        >
          {t("secao3_title")}
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#704b30]/50 backdrop-blur-md border border-[#8b5e3c]/30 p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
              <Factory className="text-orange-400 w-8 h-8" />
              <h3 className="text-2xl md:text-3xl font-semibold">
                {t("secao3_card1_title")}
              </h3>
            </div>
            <p className="text-base sm:text-lg leading-relaxed mb-6 md:mb-8 text-gray-100">
              {t("secao3_card1_text")}
            </p>
            <button className="text-orange-400 font-semibold text-base sm:text-lg hover:underline">
              {t("secao3_button")} →
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#704b30]/50 backdrop-blur-md border border-[#8b5e3c]/30 p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
              <ShieldCheck className="text-orange-400 w-8 h-8" />
              <h3 className="text-2xl md:text-3xl font-semibold">
                {t("secao3_card2_title")}
              </h3>
            </div>
            <p className="text-base sm:text-lg leading-relaxed mb-6 md:mb-8 text-gray-100">
              {t("secao3_card2_text")}
            </p>
            <button className="text-orange-400 font-semibold text-base sm:text-lg hover:underline">
              {t("secao3_button")} →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Secao3;
