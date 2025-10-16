"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShoppingCart, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { slugify } from "../lib/utils/slugify";

export default function Header() {
  const router = useRouter();
  const { cart } = useCart();
  const { user, logout } = useUser();
  const { openAuthModal } = useAuth();

  const [showLang, setShowLang] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLang, setCurrentLang] = useState({
    code: "PT",
    label: "Português",
    flag: "/flags/pt.png",
  });

  const languages = [
    { code: "PT", label: "Português", flag: "/flags/pt.png" },
    { code: "EN", label: "English", flag: "/flags/en.png" },
    { code: "CN", label: "中文", flag: "/flags/cn.png" },
  ];

  const categories = [
    "Embalagem",
    "Escritório",
    "Roupas e Calçados",
    "Cozinha e Mesa",
    "Beleza",
    "Eletro",
    "Proteção",
    "Construção",
  ];

  const categoryMap: { [key: string]: string[] } = {
    Embalagem: ["Embalagens"],
    Escritório: ["Escritório"],
    "Roupas e Calçados": [
      "Roupas Femininas",
      "Calçados",
      "Acessórios",
      "Mais Avaliados",
    ],
    "Cozinha e Mesa": ["Cozinha"],
    Beleza: [],
    Eletro: ["Echo e Fire TV", "Mais Vantagens"],
    Proteção: ["Saúde"],
    Construção: ["Material de Construção"],
  };

  const performSearch = (term: string, displayCategory: string) => {
    const query = encodeURIComponent(term.trim());
    let productCategories: string[] = [];

    if (displayCategory === "Todos") productCategories = [];
    else productCategories = categoryMap[displayCategory] || [];

    const slugified = productCategories.map((cat) => slugify(cat));
    const categoryQuery =
      slugified.length > 0
        ? `&category=${encodeURIComponent(slugified.join(","))}`
        : "";

    if (query || categoryQuery)
      router.push(`/produtos?search=${query}${categoryQuery}`);
    else router.push("/produtos");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm, currentCategory);
  };

  return (
    <header className="w-full shadow-md sticky top-0 z-50">
      {/* ================== NAV 1 (DESKTOP) ================== */}
      <div className="hidden md:flex bg-[#4B0082] text-white px-8 py-3 items-center gap-6 border-b border-[#3b006b]">
        {/* LOGO */}
        <Link
          href="/"
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <span className="text-2xl font-bold tracking-wide">
            <span className="text-[#ff914d]">Ok</span>Boss
          </span>
          <span className="text-sm text-white/80">Comércio & Serviços</span>
        </Link>

        {/* PESQUISA + CATEGORIAS */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 relative max-w-2xl mx-auto"
        >
          {/* BOTÃO DE CATEGORIAS */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-1 px-3 py-2 bg-[#3b006b] text-white border border-[#4B0082] rounded-l-md font-medium hover:bg-[#5a0099] transition-all"
            >
              {currentCategory} <ChevronDown size={14} />
            </button>

            {showCategories && (
              <ul className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#e2e2e2] rounded-md shadow-lg z-50 text-[#4B0082] font-semibold text-sm">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setCurrentCategory(cat);
                      setShowCategories(false);
                      performSearch(searchTerm, cat);
                    }}
                    className="px-4 py-2 hover:bg-[#ede9fe] hover:text-[#ff914d] cursor-pointer transition-all"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* INPUT */}
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar..."
            className="flex-1 px-3 py-2 border-t border-b border-[#4B0082] bg-white text-gray-700 focus:outline-none"
          />

          {/* BOTÃO */}
          <button
            type="submit"
            className="bg-[#ff914d] px-4 rounded-r-md flex items-center justify-center hover:bg-[#fb7a2f] hover:scale-105 transition-all"
          >
            <Search size={18} className="text-white" />
          </button>
        </form>

        {/* IDIOMA */}
        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-2 px-3 py-2 bg-[#3b006b] border border-[#4B0082] rounded-md hover:bg-[#5a0099] hover:scale-105 transition-all"
          >
            <Image
              src={currentLang.flag}
              alt={currentLang.code}
              width={20}
              height={12}
            />
            <span className="text-sm">{currentLang.code}</span>
            <ChevronDown size={12} />
          </button>

          {showLang && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
              <ul>
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setShowLang(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#ede9fe] hover:text-[#4B0082] transition-all"
                  >
                    <Image
                      src={lang.flag}
                      alt={lang.label}
                      width={20}
                      height={12}
                    />
                    <span className="text-sm">{lang.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* LOGIN / USUÁRIO */}
        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Olá, {user.name}</span>
            {user.isAdmin ? (
              <Link
                href="/admin/orders"
                className="px-3 py-2 rounded-md hover:text-[#ff914d] hover:underline transition-all"
              >
                Pedidos
              </Link>
            ) : (
              <Link
                href="/meus-pedidos"
                className="px-3 py-2 rounded-md hover:text-[#ff914d] hover:underline transition-all"
              >
                Pedidos
              </Link>
            )}
            <button
              onClick={logout}
              className="px-3 py-2 rounded-md hover:text-[#ff914d] hover:underline transition-all"
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="font-semibold px-3 py-2 rounded-md hover:text-[#ff914d] hover:underline transition-all"
          >
            Login
          </button>
        )}

        {/* CARRINHO */}
        <div
          className="cursor-pointer relative flex items-center gap-2 px-3 py-2 rounded-md hover:text-[#ff914d] hover:scale-105 transition-all"
          onClick={() => router.push("/carrinho")}
        >
          <ShoppingCart size={22} />
          <span
            className={`absolute -top-1 right-0 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
              cart.length > 0
                ? "bg-[#ff914d] text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {cart.length}
          </span>
          <span className="hidden md:inline font-semibold">Cesto</span>
        </div>
      </div>

      {/* ================== NAV 2 (DESKTOP LINKS) ================== */}
      <div className="hidden md:flex bg-white text-[#4B0082] px-8 py-2 gap-4 font-semibold text-sm border-b border-[#e2e2e2]">
        <Link href="/ofertas" className="hover:text-[#ff914d] transition-all">
          Ofertas
        </Link>
        <Link href="/listas" className="hover:text-[#ff914d] transition-all">
          Listas
        </Link>
        <Link href="/vales" className="hover:text-[#ff914d] transition-all">
          Vales
        </Link>
        <Link href="/atendimento" className="hover:text-[#ff914d] transition-all">
          Ajuda
        </Link>
        <Link href="/vender" className="hover:text-[#ff914d] transition-all">
          Vender
        </Link>
        <Link
          href="/pedidos-devolucoes"
          className="hover:text-[#ff914d] transition-all"
        >
          Devoluções
        </Link>
      </div>

      {/* ================== MOBILE NAV ================== */}
      <div className="md:hidden bg-[#4B0082] p-4 flex items-center justify-between text-white">
        <Link href="/" className="text-xl font-bold">
          <span className="text-[#ff914d]">Ok</span>Boss
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/login")}
            className="text-sm hover:text-[#ff914d]"
          >
            {user ? "Perfil" : "Login"}
          </button>
          <div
            onClick={() => router.push("/carrinho")}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff914d] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE LINKS */}
      <div className="md:hidden bg-white text-[#4B0082] px-2 py-2 flex overflow-x-auto no-scrollbar gap-4 font-semibold text-xs border-t border-[#e2e2e2] whitespace-nowrap snap-x snap-mandatory scroll-smooth">
        <Link href="/ofertas" className="hover:text-[#ff914d] snap-start">
          Ofertas
        </Link>
        <Link href="/listas" className="hover:text-[#ff914d] snap-start">
          Listas
        </Link>
        <Link href="/vales" className="hover:text-[#ff914d] snap-start">
          Vales
        </Link>
        <Link href="/atendimento" className="hover:text-[#ff914d] snap-start">
          Ajuda
        </Link>
        <Link href="/vender" className="hover:text-[#ff914d] snap-start">
          Vender
        </Link>
        <Link
          href="/pedidos-devolucoes"
          className="hover:text-[#ff914d] snap-start"
        >
          Devoluções
        </Link>
      </div>
    </header>
  );
}
