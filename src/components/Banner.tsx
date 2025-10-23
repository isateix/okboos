"use client";

import React, { useState } from "react";
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
  const [startIndex, setStartIndex] = useState(0);
  const visibleCategories = 14;
  const { t } = useLanguage();

  const handlePrev = () => setStartIndex(prev => Math.max(prev - visibleCategories, 0));
  const handleNext = () => setStartIndex(prev =>
    Math.min(prev + visibleCategories, categories.length - visibleCategories)
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg px-6 py-12 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        <div className="flex-1 max-w-full lg:max-w-[60%] space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
            {t("banner.title")}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-w-full lg:max-w-[40%] justify-items-start">
          {stats.map((key, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-orange-500">{t(`stats.${key}`)}</span>
              <div className="w-10 h-1 bg-gray-300 my-1"></div>
              <span className="text-[#805e46] text-xs md:text-sm text-center">{t(`categories.${key}`) || key}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full hover:bg-orange-500 transition"
        >
          <MdArrowBackIos className="w-5 h-5 text-gray-700 hover:text-white" />
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.slice(startIndex, startIndex + visibleCategories).map((cat, idx) => {
            const IconComp = icons[startIndex + idx];
            return (
              <div key={idx} className="flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border-2 border-gray-300 hover:border-orange-500 flex flex-col items-center justify-center p-3">
                  <IconComp className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700 mb-2" />
                  <span className="text-xs sm:text-sm text-gray-800 text-center">{t(`categories.${cat}`)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full hover:bg-orange-500 transition"
        >
          <MdArrowForwardIos className="w-5 h-5 text-gray-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
