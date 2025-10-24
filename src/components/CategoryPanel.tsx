"use client";

import React, { useState } from "react";
import { FaLeaf, FaLaptop, FaTshirt, FaHome, FaFootballBall, FaTools, FaCar, FaGift, FaLightbulb, FaRegClock } from "react-icons/fa";

interface Category {
  label: string;
  icon: React.ElementType;
}

interface CategoryPanelProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

const subCategories: Record<string, string[]> = {
  "categories.Luzes e Iluminação": [
    "Lâmpadas LED",
    "Luzes decorativas",
    "Refletores industriais",
    "Luminárias de teto",
    "Abajures de mesa",
    "Luzes solares",
    "Fitas de LED",
    "Luzes inteligentes",
    "Painéis de iluminação",
    "Luzes externas",
    "Lanternas recarregáveis",
    "Ver tudo",
  ],
  "categories.Saúde": [
    "Equipamentos médicos",
    "Suplementos alimentares",
    "Produtos de higiene",
    "Máscaras faciais",
    "Dispositivos de medição",
    "Medicamentos básicos",
    "Material hospitalar",
    "Primeiros socorros",
    "Produtos ortopédicos",
    "Estetoscópios",
    "Termômetros digitais",
    "Ver tudo",
  ],
  "categories.Máquinas para construção": [
    "Escavadeiras",
    "Betoneiras",
    "Gruas",
    "Caminhões basculantes",
    "Compactadores",
    "Carregadeiras",
    "Guindastes",
    "Tratores",
    "Peças hidráulicas",
    "Plataformas elevatórias",
    "Retroescavadeiras",
    "Ver tudo",
  ],
  "categories.Energia Renovável": [
    "Painéis solares",
    "Turbinas eólicas",
    "Controladores solares",
    "Baterias solares",
    "Inversores",
    "Luminárias solares",
    "Geradores híbridos",
    "Bombas solares",
    "Cabos solares",
    "Carregadores solares",
    "Armazenamento de energia",
    "Ver tudo",
  ],
  "categories.Equipamento e Material Elétrico": [
    "Cabos e fios",
    "Disjuntores",
    "Tomadas e interruptores",
    "Quadros elétricos",
    "Transformadores",
    "Relés e sensores",
    "Conectores",
    "Ferramentas elétricas",
    "Medidores de energia",
    "Caixas de passagem",
    "Plugues e adaptadores",
    "Ver tudo",
  ],
  "categories.Material de Escritório e Escolar": [
    "Canetas e lápis",
    "Cadernos e blocos",
    "Papel A4",
    "Pastas e arquivos",
    "Marcadores",
    "Apontadores e borrachas",
    "Mochilas escolares",
    "Organizadores",
    "Quadros brancos",
    "Etiquetas adesivas",
    "Materiais artísticos",
    "Ver tudo",
  ],
  "categories.Componentes Eletrônicos": [
    "Resistores",
    "Capacitores",
    "Diodos",
    "Transistores",
    "Microcontroladores",
    "Placas PCB",
    "Relés",
    "Sensores",
    "Conectores",
    "Fontes de alimentação",
    "Displays LED",
    "Ver tudo",
  ],
  "categories.Acessórios e Telecomunicações": [
    "Cabos de rede",
    "Roteadores Wi-Fi",
    "Antenas",
    "Headsets",
    "Adaptadores USB",
    "Carregadores",
    "Capas de celular",
    "Suportes para celular",
    "Powerbanks",
    "Fones Bluetooth",
    "Repetidores de sinal",
    "Ver tudo",
  ],
  "categories.Materiais e Aparelhos Médicos": [
    "Equipamentos hospitalares",
    "Luvas descartáveis",
    "Máscaras médicas",
    "Aparelhos de pressão",
    "Termômetros",
    "Cadeiras de rodas",
    "Monitores cardíacos",
    "Equipamentos de oxigênio",
    "Balanças médicas",
    "Desinfetantes",
    "Materiais de laboratório",
    "Ver tudo",
  ],
  "categories.Produtos Químicos": [
    "Produtos de limpeza",
    "Detergentes industriais",
    "Álcool isopropílico",
    "Ácido sulfúrico",
    "Soda cáustica",
    "Desinfetantes",
    "Lubrificantes",
    "Tintas e solventes",
    "Aditivos industriais",
    "Fertilizantes químicos",
    "Produtos cosméticos",
    "Ver tudo",
  ],
  "categories.Instrumento de teste e Equipamentos": [
    "Multímetros",
    "Osciloscópios",
    "Testadores de cabos",
    "Medidores de temperatura",
    "Sensores de pressão",
    "Câmeras térmicas",
    "Detectores de gás",
    "Medidores de corrente",
    "Instrumentos de calibração",
    "Fontes de teste",
    "Equipamentos de medição",
    "Ver tudo",
  ],
  "categories.Comida e Bebida": [
    "Snacks e doces",
    "Bebidas não alcoólicas",
    "Café e chá",
    "Cereais e grãos",
    "Produtos lácteos",
    "Carnes e frios",
    "Condimentos e molhos",
    "Produtos congelados",
    "Comidas prontas",
    "Frutas secas",
    "Águas e sumos",
    "Ver tudo",
  ],
  "categories.Agricultura": [
    "Sementes e mudas",
    "Fertilizantes orgânicos",
    "Ferramentas agrícolas",
    "Máquinas agrícolas",
    "Sistemas de irrigação",
    "Agrotóxicos",
    "Equipamentos de colheita",
    "Produtos veterinários",
    "Plantas ornamentais",
    "Rações animais",
    "Tubos e conexões agrícolas",
    "Ver tudo",
  ],
};

export default function CategoryPanel({ categories, isOpen, onClose }: CategoryPanelProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-[100] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-[80%] md:w-[350px] overflow-y-auto`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Categorias</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
      </div>

      <div className="flex">
        {/* Lista de categorias */}
        <div className="w-1/2 border-r overflow-y-auto h-[calc(100vh-60px)]">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                  hoveredCategory === cat.label ? "bg-gray-200" : ""
                }`}
                onMouseEnter={() => setHoveredCategory(cat.label)}
              >
                <Icon className="text-gray-600" />
                <span className="text-sm">{cat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Subcategorias */}
        <div className="w-1/2 p-4 overflow-y-auto h-[calc(100vh-60px)]">
          {hoveredCategory && (
            <>
              <h3 className="font-semibold text-gray-700 mb-2">{hoveredCategory}</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {subCategories[hoveredCategory]?.map((sub, i) => (
                  <li key={i} className="hover:text-blue-600 cursor-pointer">{sub}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
