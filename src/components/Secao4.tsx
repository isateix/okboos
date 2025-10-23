"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, CreditCard, Truck, Settings, X } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function Secao4() {
  const { t } = useLanguage();
  const passos = [
    {
      key: "step1",
      icone: Search,
      imagem: "/images/produ.png",
    },
    {
      key: "step2",
      icone: CheckCircle,
      imagem: "/images/conv.jpg",
    },
    {
      key: "step3",
      icone: CreditCard,
      imagem: "/images/paga.jpg",
    },
    {
      key: "step4",
      icone: Truck,
      imagem: "/images/porto1.jpg",
    },
    {
      key: "step5",
      icone: Settings,
      imagem: "/images/gerencie.jpg",
    },
  ];

  const [ativo, setAtivo] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-start justify-between overflow-hidden">
      {/* Lado esquerdo */}
      <div className="w-full md:w-[70%] flex flex-col space-y-10 mb-10 md:mb-0">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-[90%]">
          {t("secao4_title")}
        </h2>

        <div className="flex flex-col space-y-8">
          {passos.map((item, index) => {
            const Icon = item.icone;
            const isActive = ativo === index;
            return (
              <div
                key={index}
                onMouseEnter={() => setAtivo(index)}
                onMouseLeave={() => setAtivo(null)}
                className={`cursor-pointer transition-all duration-300 p-4 rounded-2xl ${
                  isActive ? "bg-rose-50 shadow-md" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-rose-100 border-rose-300 text-orange-500"
                        : "bg-white border-gray-300 text-gray-600"
                    }`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3
                    className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                      isActive ? "text-orange-600" : "text-gray-800"
                    }`}
                  >
                    {t(`${item.key}_title`)}
                  </h3>
                </div>

                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 mt-3 ml-16 text-base md:text-lg leading-relaxed max-w-[90%]"
                  >
                    {t(`${item.key}_desc`)}
                  </motion.p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal flutuante (desktop) */}
      <AnimatePresence>
        {ativo !== null && (
          <motion.div
            key={ativo}
            initial={{ x: 300, opacity: 0, y: -20 }}
            animate={{ x: 0, opacity: 1, y: 0 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden md:flex fixed top-[55%] right-[4%] -translate-y-1/2 w-[380px] h-[460px] bg-white border border-gray-300 shadow-2xl z-40 rounded-2xl overflow-hidden items-center justify-center"
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-orange-600 z-50"
              onClick={() => setAtivo(null)}
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-full">
              <Image
                src={passos[ativo].imagem}
                alt={t(`${passos[ativo].key}_title`)}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mostra imagem logo abaixo no mobile */}
      {ativo !== null && (
        <div className="relative md:hidden w-full h-80 rounded-2xl overflow-hidden mt-8 shadow-lg">
          <Image
            src={passos[ativo].imagem}
            alt={t(`${passos[ativo].key}_title`)}
            fill
            className="object-cover"
          />
        </div>
      )}
    </section>
  );
}
