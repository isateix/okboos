"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Search, Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useLanguage } from "../context/LanguageContext";
import {
  FaLeaf, FaLaptop, FaTshirt, FaHome, FaFootballBall,
  FaTools, FaCar, FaGift, FaLightbulb, FaRegClock
} from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const { user } = useUser();
  const { locale, setLocale, t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);
  const [categoriesPanelOpen, setCategoriesPanelOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim())
      router.push(`/produtos?search=${encodeURIComponent(searchTerm.trim())}`);
    else router.push("/produtos");
  };

  const categories = [
    { label: "Meio Ambiente", icon: FaLeaf },
    { label: "Serviços Empresariais", icon: FaLaptop },
    { label: "Aparelhos Eletrônicos", icon: FaLaptop },
    { label: "Vestuário", icon: FaTshirt },
    { label: "Casa e Jardim", icon: FaHome },
    { label: "Esportes e Entretenimento", icon: FaFootballBall },
    { label: "Equipamento comercial & maquinaria", icon: FaTools },
    { label: "Peças e Acessórios para Veículo", icon: FaCar },
    { label: "Beleza e cuidados pessoais", icon: FaGift },
    { label: "Máquinas e Indústrias", icon: FaTools },
    { label: "Móveis", icon: FaHome },
    { label: "Mãe, crianças e brinquedos", icon: FaTshirt },
    { label: "Construções e Imóveis", icon: FaHome },
    { label: "Acessórios automóveis", icon: FaCar },
    { label: "Eletrodomésticos", icon: FaLaptop },
    { label: "Bagagem e Bolsas", icon: FaGift },
    { label: "Veículos e Transportes", icon: FaCar },
    { label: "Calçados e Acessórios", icon: FaTshirt },
    { label: "Cuidados pessoais e domésticos", icon: FaGift },
    { label: "Luzes e Iluminação", icon: FaLightbulb },
    { label: "Saúde", icon: FaRegClock },
    { label: "Máquinas para construção", icon: FaTools },
    { label: "Energia Renovável", icon: FaLightbulb },
    { label: "Equipamento e Material Elétrico", icon: FaTools },
    { label: "Material de Escritório e Escolar", icon: FaLaptop },
    { label: "Componentes Eletrônicos", icon: FaLaptop },
    { label: "Acessórios e Telecomunicações", icon: FaLaptop },
    { label: "Materiais e Aparelhos Médicos", icon: FaRegClock },
    { label: "Produtos Químicos", icon: FaRegClock },
    { label: "Instrumento de teste e Equipamentos", icon: FaRegClock },
    { label: "Comida e Bebida", icon: FaGift },
    { label: "Serviços de Fabricação", icon: FaLaptop },
    { label: "Transmissão de Energia", icon: FaLightbulb },
    { label: "Proteção, Borracha e Plásticos", icon: FaRegClock },
    { label: "Mercado de serviços logísticos do comprador", icon: FaLaptop },
    { label: "Minerais e Metalurgia", icon: FaTools },
    { label: "Manuseio de materiais", icon: FaTools },
    { label: "Tecido e Matérias-primas Têxteis", icon: FaTshirt },
    { label: "Suprimentos para animais de estimação", icon: FaLeaf },
    { label: "Segurança", icon: FaRegClock },
    { label: "Agricultura", icon: FaLeaf },
  ];

  const mainLinks = [
    { label: "featuredSelections", href: "/selecoes" },
    { label: "orderProtections", href: "/protecoes" },
    { label: "buyersCenter", href: "/central-compradores" },
    { label: "support", href: "/atendimento" },
    { label: "becomeSupplier", href: "/fornecedores" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">

      {/* 🧭 DESKTOP NAV 1 */}
      <div className="hidden md:flex items-center justify-between px-8 py-3">
        <Link href="/" className="text-2xl font-bold text-[#ff5000]">OkBoss.com</Link>

        <form onSubmit={handleSearchSubmit} className="flex flex-1 max-w-2xl mx-4">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-full bg-[#f7f7f7] focus:outline-none border border-gray-300"
          />
          <button type="submit" className="px-5 bg-[#ff5000] rounded-r-full hover:bg-[#e04b00] transition-all text-white">
            <Search size={18} />
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-md p-1">
            🌐
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as "pt" | "en" | "cn")}
              className="ml-1 bg-white border-none outline-none"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="cn">中文</option>
            </select>
          </div>
          {!user && (
            <>
             <button
  onClick={() => router.push("/login")}
  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full"
>
  <User size={18} className="shrink-0" />
  <span className="whitespace-nowrap">{t("entrar")}</span>
</button>
              <button onClick={() => router.push("/criar-conta")} className="px-4 py-2 bg-[#ff5000] text-white rounded-full hover:bg-[#e04b00]">
                {t("signup")}
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🧭 DESKTOP NAV 2 */}
      <div className="hidden md:flex items-center gap-6 px-8 py-2 text-sm font-semibold text-gray-700">
        <button
          onClick={() => setCategoriesPanelOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} /> {t("allCategories")}
        </button>

        {mainLinks.map(link => (
          <Link key={link.label} href={link.href} className="hover:text-[#ff5000]">{t(link.label)}</Link>
        ))}
      </div>

      {/* 📱 MOBILE NAV 1 */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-b">
        <Link href="/" className="text-xl font-bold text-[#ff5000]">OkBoss.com</Link>
        <div className="flex items-center gap-3">
          <button onClick={() => setSearchOpenMobile(!searchOpenMobile)}><Search size={20} /></button>
          <div className="border border-gray-300 rounded-md p-1">
            🌐
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as "pt" | "en" | "cn")}
              className="bg-white border-none outline-none"
            >
              <option value="pt">PT</option>
              <option value="en">EN</option>
              <option value="cn">中文</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE NAV 2 */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-b">
        <button onClick={() => setCategoriesPanelOpen(true)} className="flex items-center gap-2">
          <Menu size={20} /> {t("allCategories")}
        </button>
        <div className="flex items-center gap-2">
          <User size={20} className="text-gray-600" />
         
          <button onClick={() => router.push("/criar-conta")} className="bg-[#ff5000] text-white px-3 py-1 rounded-md">
            {t("signup")}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE NAV 3 */}
      <div className="md:hidden flex gap-4 overflow-x-auto px-4 py-2 text-sm">
        {mainLinks.map(link => (
          <Link key={link.label} href={link.href} className="whitespace-nowrap hover:text-[#ff5000]">
            {t(link.label)}
          </Link>
        ))}
      </div>

      {/* 🧩 Painel lateral (CATEGORIAS) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-[100] 
        ${categoriesPanelOpen ? "translate-x-0" : "-translate-x-full"} 
        w-[80%] md:w-[300px] overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">{t("allCategories")}</h2>
          <button onClick={() => setCategoriesPanelOpen(false)}><X size={22} /></button>
        </div>

        <ul>
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <li
                key={cat.label}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer relative"
                onMouseEnter={() => setHoveredCategory(cat.label)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Icon size={18} /> {t(cat.label)}

                {/* Subcategorias simuladas */}
                {hoveredCategory === cat.label && (
                  <ul className="hidden md:block absolute left-full top-0 bg-white shadow-lg border w-56">
                    <li className="px-4 py-2 hover:bg-gray-100">{t("Subcategoria 1")}</li>
                    <li className="px-4 py-2 hover:bg-gray-100">{t("Subcategoria 2")}</li>
                    <li className="px-4 py-2 hover:bg-gray-100">{t("Subcategoria 3")}</li>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
