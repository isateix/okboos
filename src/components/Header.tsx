"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Search, Menu, X, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useLanguage } from "../context/LanguageContext";
import {
  FaLeaf, FaLaptop, FaTshirt, FaHome, FaFootballBall,
  FaTools, FaCar, FaGift, FaLightbulb, FaRegClock
} from "react-icons/fa";
import { products, Product } from "../data/products";



export default function Header() {
  const router = useRouter();
  const { user, logout } = useUser();
  const { cart } = useCart();
  const { locale, setLocale, t } = useLanguage();
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    { label: t("categories.Meio Ambiente"), icon: FaLeaf },
    { label: t("categories.Serviços Empresariais"), icon: FaLaptop },
    { label: t("categories.Aparelhos Eletrônicos"), icon: FaLaptop },
    { label: t("categories.Vestuário"), icon: FaTshirt },
    { label: t("categories.Casa e Jardim"), icon: FaHome },
    { label: t("categories.Esportes e Entretenimento"), icon: FaFootballBall },
    { label: t("categories.Equipamento comercial & maquinaria"), icon: FaTools },
    { label: t("categories.Peças e Acessórios para Veículo"), icon: FaCar },
    { label: t("categories.Beleza e cuidados pessoais"), icon: FaGift },
    { label: t("categories.Máquinas e Indústrias"), icon: FaTools },
    { label: t("categories.Móveis"), icon: FaHome },
    { label: t("categories.Mãe, crianças e brinquedos"), icon: FaTshirt },
    { label: t("categories.Construções e Imóveis"), icon: FaHome },
    { label: t("categories.Acessórios automóveis"), icon: FaCar },
    { label: t("categories.Eletrodomésticos"), icon: FaLaptop },
    { label: t("categories.Bagagem e Bolsas"), icon: FaGift },
    { label: t("categories.Veículos e Transportes"), icon: FaCar },
    { label: t("categories.Calçados e Acessórios"), icon: FaTshirt },
    { label: t("categories.Cuidados pessoais e domésticos"), icon: FaGift },
    { label: t("categories.Luzes e Iluminação"), icon: FaLightbulb },
    { label: t("categories.Saúde"), icon: FaRegClock },
    { label: t("categories.Máquinas para construção"), icon: FaTools },
    { label: t("categories.Energia Renovável"), icon: FaLightbulb },
    { label: t("categories.Equipamento e Material Elétrico"), icon: FaTools },
    { label: t("categories.Material de Escritório e Escolar"), icon: FaLaptop },
    { label: t("categories.Componentes Eletrônicos"), icon: FaLaptop },
    { label: t("categories.Acessórios e Telecomunicações"), icon: FaLaptop },
    { label: t("categories.Materiais e Aparelhos Médicos"), icon: FaRegClock },
    { label: t("categories.Produtos Químicos"), icon: FaRegClock },
    { label: t("categories.Instrumento de teste e Equipamentos"), icon: FaRegClock },
    { label: t("categories.Comida e Bebida"), icon: FaGift },
    { label: t("categories.Serviços de Fabricação"), icon: FaLaptop },
    { label: t("categories.Transmissão de Energia"), icon: FaLightbulb },
    { label: t("categories.Proteção, Borracha e Plásticos"), icon: FaRegClock },
    { label: t("categories.Mercado de serviços logísticos do comprador"), icon: FaLaptop },
    { label: t("categories.Minerais e Metalurgia"), icon: FaTools },
    { label: t("categories.Manuseio de materiais"), icon: FaTools },
    { label: t("categories.Tecido e Matérias-primas Têxteis"), icon: FaTshirt },
    { label: t("categories.Suprimentos para animais de estimação"), icon: FaLeaf },
    { label: t("categories.Segurança"), icon: FaRegClock },
    { label: t("categories.Agricultura"), icon: FaLeaf },
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
      {/* 🧭 DESKTOP HEADER */}
      <div className="hidden md:flex flex-col">
        <div className="flex items-center justify-between px-8 py-3">
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
            {/* Carrinho */}
            <div className="relative cursor-pointer" onClick={() => router.push("/carrinho")}>
              <ShoppingCart size={24} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

            {/* Idioma + Login */}
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

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">👋 {user.name || user.email}</span>
                  <button
                    onClick={async () => {
                      await fetch("/api/auth/signout", { method: "POST" });
                      logout();
                      router.push("/");
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
                  >
                    {t("logout") || "Sair"}
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/login")}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full"
                  >
                    <User size={18} />
                    <span>{t("login")}</span>
                  </button>
                  <button
                    onClick={() => router.push("/criar-conta")}
                    className="px-4 py-2 bg-[#ff5000] text-white rounded-full hover:bg-[#e04b00]"
                  >
                    {t("signup")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Linha 2: Navegação */}
        <div className="flex items-center gap-6 px-8 py-2 text-sm font-semibold text-gray-700">
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
      </div>

      {/* 📱 MOBILE HEADER */}
      <div className="md:hidden flex flex-col">
        {/* Topo: logo, pesquisa, idioma */}
        <div className="flex items-center justify-between px-4 py-2">
          <Link href="/" className="text-xl font-bold text-[#ff5000]">OkBoss.com</Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpenMobile(!searchOpenMobile)}>
              <Search size={20} />
            </button>

            <div className="relative cursor-pointer" onClick={() => router.push("/carrinho")}>
              <ShoppingCart size={24} />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

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

        {searchOpenMobile && (
          <form onSubmit={handleSearchSubmit} className="flex px-4 py-2">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l-full bg-[#f7f7f7] focus:outline-none border border-gray-300"
            />
            <button type="submit" className="px-5 bg-[#ff5000] rounded-r-full text-white hover:bg-[#e04b00]">
              <Search size={18} />
            </button>
          </form>
        )}

        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={() => setCategoriesPanelOpen(true)} className="flex items-center gap-2">
            <Menu size={20} /> {t("allCategories")}
          </button>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-gray-700 text-sm">{user.name || "Admin"}</span>
                <button
                  onClick={async () => {
                    await fetch("/api/auth/signout", { method: "POST" });
                    logout();
                    router.push("/");
                  }}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300"
                >
                  {t("logout") || "Sair"}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => router.push("/login")} className="flex items-center gap-1">
                  <User size={20} className="text-gray-600" />
                  <span>{t("login")}</span>
                </button>
                <button
                  onClick={() => router.push("/criar-conta")}
                  className="bg-[#ff5000] text-white px-3 py-1 rounded-md"
                >
                  {t("signup")}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto px-4 py-2 text-sm">
          {mainLinks.map(link => (
            <Link key={link.label} href={link.href} className="whitespace-nowrap hover:text-[#ff5000]">
              {t(link.label)}
            </Link>
          ))}
        </div>
      </div>
{/* 🧩 Painel lateral de categorias e produtos */}
{categoriesPanelOpen && (
  <div
    className={`${
      typeof window !== "undefined" && window.innerWidth >= 768
        ? "fixed top-[120px] left-0 w-full h-[calc(100vh-120px)]" // desktop (não alterado)
        : "absolute top-[104px] left-0 w-full h-auto" // mobile colado abaixo da nav 3
    } bg-white shadow-lg z-[100] flex flex-col md:flex-row transition-transform duration-300`}
  >
    {/* Lado esquerdo: lista de categorias */}
    <div className="w-full md:w-1/5 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
      <ul>
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <li
              key={cat.label}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                selectedCategory === cat.label
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedCategory(cat.label);
                if (window.innerWidth < 768) {
                  setCategoriesPanelOpen(false); // fechar painel mobile ao clicar
                }
              }}
            >
              <Icon size={18} /> {t(cat.label)}
            </li>
          );
        })}
      </ul>
    </div>

    {/* Lado direito: produtos filtrados */}
    {selectedCategory && (
      <div className="w-full md:w-4/5 p-4 overflow-y-auto h-[calc(100vh-120px)]">
        <h2 className="text-lg font-semibold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          {products
            .filter((product) => product.category === selectedCategory)
            .slice(0, 12)
            .map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-gray-200 flex items-center justify-center overflow-hidden hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-xs sm:text-sm md:text-base text-center font-medium">
                  {product.name}
                </span>
              </div>
            ))}
        </div>
      </div>
    )}
  </div>
)}

    </header>
  );
}
