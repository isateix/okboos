"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Secao7() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-white py-24 px-8 md:px-16 overflow-hidden">
      {/* Texto principal centralizado */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          {t("secao7_title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
        >
          <span className="font-semibold text-gray-900">{t("companyName")}</span>{" "}
          {t("secao7_description")}
        </motion.p>
      </div>

      {/* Duas imagens lado a lado */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Imagem 1 */}
        <div className="relative w-full min-h-[380px] md:w-1/2 md:h-96 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/rir.jpg"
            alt={t("mission_title")}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold text-orange-500">
              {t("mission_title")}
            </h3>
            <p className="text-base text-gray-200">{t("mission_text")}</p>
          </div>
        </div>

        {/* Imagem 2 */}
        <div className="relative w-full min-h-[380px] md:w-1/2 md:h-96 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/mapachina.jpg"
            alt={t("commitment_title")}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-semibold text-orange-500">
              {t("commitment_title")}
            </h3>
            <p className="text-base text-gray-200">{t("commitment_text")}</p>
          </div>
        </div>
      </div>

      {/* Texto abaixo das imagens */}
      <div className="max-w-4xl mx-auto text-center mt-14">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {t("secao7_subtitle")}
        </h3>
        <button className="flex items-center gap-2 mx-auto text-orange-600 font-semibold hover:underline">
          {t("secao7_button")} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
