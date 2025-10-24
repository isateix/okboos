"use client";

import React, { useState, useEffect } from "react";
import {
  FaLeaf, FaLaptop, FaTshirt, FaHome, FaFootballBall, FaTools, FaCar,
  FaGift, FaLightbulb, FaRegClock
} from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";

const stats = ["produtos", "fornecedores", "categorias", "paises"];
const categories = [
  "Meio Ambiente", "Serviços Empresariais", "Aparelhos Eletrônicos", "Vestuário",
  "Casa e Jardim", "Esportes e Entretenimento", "Equipamento comercial & maquinaria",
  "Peças e Acessórios para Veículo", "Beleza e cuidados pessoais", "Máquinas e Indústrias",
  "Móveis", "Mãe, crianças e brinquedos", "Construções e Imóveis", "Acessórios automóveis",
  "Eletrodomésticos", "Bagagem e Bolsas", "Veículos e Transportes", "Calçados e Acessórios",
  "Cuidados pessoais e domésticos", "Luzes e Iluminação", "Saúde", "Máquinas para construção",
  "Energia Renovável", "Equipamento e Material Elétrico", "Material de Escritório e Escolar",
  "Componentes Eletrônicos", "Acessórios e Telecomunicações", "Materiais e Aparelhos Médicos",
  "Produtos Químicos", "Instrumento de teste e Equipamentos", "Comida e Bebida",
  "Serviços de Fabricação", "Transmissão de Energia", "Proteção, Borracha e Plásticos",
  "Mercado de serviços logísticos do comprador", "Minerais e Metalurgia",
  "Manuseio de materiais", "Tecido e Matérias-primas Têxteis", "Suprimentos para animais de estimação",
  "Segurança", "Agricultura"
];

const icons = [
  FaLeaf, FaLaptop, FaLaptop, FaTshirt, FaHome, FaFootballBall, FaTools, FaCar, FaGift,
  FaTools, FaHome, FaTshirt, FaHome, FaCar, FaLaptop, FaGift, FaCar, FaTshirt, FaGift,
  FaLightbulb, FaRegClock, FaTools, FaLightbulb, FaTools, FaLaptop, FaLaptop, FaLaptop,
  FaRegClock, FaRegClock, FaRegClock, FaGift, FaLaptop, FaLightbulb, FaRegClock, FaLaptop,
  FaTools, FaTools, FaTshirt, FaLeaf, FaRegClock, FaLeaf
];

export default function Banner() {
  const { t } = useLanguage();
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(14);

  // ✅ Responsividade dinâmica
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCategories(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCategories(4);
      } else {
        setVisibleCategories(14);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => setStartIndex(prev => Math.max(prev - visibleCategories, 0));
  const handleNext = () => setStartIndex(prev =>
    Math.min(prev + visibleCategories, categories.length - visibleCategories)
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg px-4 sm:px-6 py-10 sm:py-12 relative overflow-hidden">
      {/* Cabeçalho */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left gap-10">
        <div className="flex-1 max-w-full lg:max-w-[60%] space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            {t("banner.title")}
          </h2>
        </div>

        {/* Estatísticas (centralizadas no mobile) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-4 max-w-full lg:max-w-[40%] justify-items-center lg:justify-items-start mt-6 lg:mt-0">
          {stats.map((key, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-orange-500">
                {t(`stats.${key}`)}
              </span>
              <div className="w-10 h-1 bg-gray-300 my-1"></div>
              <span className="text-[#805e46] text-xs sm:text-sm text-center">
                {t(`categories.${key}`) || key}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorias */}
      <div className="mt-10 relative">
        {/* Setas ajustadas para mobile */}
        <button
          onClick={handlePrev}
          className="absolute left-[-8px] sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 p-1 sm:p-2 rounded-full hover:bg-orange-500 transition"
        >
          <MdArrowBackIos className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 hover:text-white" />
        </button>

        {/* Grelha de categorias com ajustes no tamanho e texto */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 justify-items-center">
          {categories.slice(startIndex, startIndex + visibleCategories).map((cat, idx) => {
            const IconComp = icons[startIndex + idx];
            return (
              <div
                key={idx}
                className="flex items-center justify-center cursor-pointer transition-all hover:scale-105"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white border-2 border-gray-300 hover:border-orange-500 flex flex-col items-center justify-center px-3 sm:px-4 py-3 sm:py-4">
                  <IconComp className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-gray-700 mb-2 sm:mb-3" />
                  <span className="text-[12px] sm:text-sm md:text-base font-medium text-gray-800 text-center leading-snug tracking-tight">
                    {t(`categories.${cat}`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-[-8px] sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 p-1 sm:p-2 rounded-full hover:bg-orange-500 transition"
        >
          <MdArrowForwardIos className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
