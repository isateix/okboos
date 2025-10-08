"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronDown, ShoppingCart, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const router = useRouter();
  const { cart, total } = useCart();
  const { user } = useUser();
  const { openAuthModal } = useAuth();

  // Estados
  const [showCategories, setShowCategories] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("Todos");

  const languages = [
    { code: "PT", label: "Português", flag: "/flags/pt.png" },
    { code: "EN", label: "English", flag: "/flags/en.png" },
    { code: "CN", label: "中文", flag: "/flags/cn.png" },
  ];
  const [currentLang, setCurrentLang] = useState(languages[0]);

  const categories = [
    "Materiais de embalagem",
    "Materiais de escritório",
    "Roupas, sapatos e chapéus",
    "Utensílios de cozinha e mesa",
    "Perfumes e beleza",
    "Eletrodomésticos",
    "Materiais de proteção do trabalho",
    "Ferragens e materiais de construção",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = encodeURIComponent(searchTerm.trim());
    const categoryQuery = currentCategory !== "Todos" ? `&category=${encodeURIComponent(currentCategory)}` : "";
    if (query || categoryQuery) {
      router.push(`/produtos?search=${query}${categoryQuery}`);
    } else {
      router.push("/produtos");
    }
  };

  return (
    <header className="w-full">
      {/* ================== NAV DESKTOP ================== */}
      <div className="hidden md:flex bg-white px-8 py-3 items-center gap-6 border-b">
        {/* LOGO */}
        <Link href="/" className="flex flex-col items-center">
          <span className="text-2xl font-bold">OkBoss</span>
          <span className="text-sm text-gray-600">Comércio e Serviços</span>
        </Link>

        {/* PESQUISA */}
        <form onSubmit={handleSearchSubmit} className="flex flex-1 relative max-w-2xl mx-auto">
          {/* BOTÃO CATEGORIAS */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCategories((s) => !s)}
              className="flex items-center gap-1 px-3 py-2 bg-gray-200 border border-gray-300 rounded-l-md font-medium hover:bg-gray-300"
            >
              {currentCategory} <ChevronDown size={16} />
            </button>
            {showCategories && (
              <ul className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setCurrentCategory(cat);
                      setShowCategories(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* INPUT PESQUISA */}
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar produtos..."
            className="flex-1 px-3 py-2 border-t border-b border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 rounded-r-md flex items-center justify-center hover:bg-blue-700"
          >
            <Search size={18} className="text-white" />
          </button>
        </form>

        {/* IDIOMA */}
        <div className="relative">
          <button
            onClick={() => setShowLang((s) => !s)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-200"
          >
            <Image src={currentLang.flag} alt={currentLang.code} width={28} height={18} />
            <span>{currentLang.code}</span>
            <ChevronDown size={16} />
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
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <Image src={lang.flag} alt={lang.label} width={24} height={16} />
                    <span>{lang.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* LOGIN / USUÁRIO */}
        <button
          onClick={openAuthModal}
          className="font-semibold px-3 py-2 rounded-md hover:bg-gray-200"
        >
          {user ? `Olá, ${user.nome}` : "Olá, entrar"}
        </button>

        {/* CARRINHO */}
        <div
          className="cursor-pointer relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200"
          onClick={() => router.push("/carrinho")}
        >
          <ShoppingCart size={28} />
          <span
            className={`absolute -top-1 right-0 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ${
              cart.length > 0 ? "bg-red-600 text-white" : "bg-gray-400 text-white"
            }`}
          >
            {cart.length}
          </span>
          <span className="hidden md:inline">Carrinho</span>
          <span className="hidden md:inline font-bold">
            {total.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
          </span>
        </div>
      </div>

      {/* NAV MOBILE continua igual */}
    </header>
  );
}
