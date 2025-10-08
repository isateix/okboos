"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronDown, ShoppingCart, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

import { slugify } from "../lib/utils/slugify";

export default function Header() {
  const router = useRouter();
  const { cart, total } = useCart();
  const { user, logout } = useUser();
  const { openAuthModal } = useAuth();

  // Estados
  const [showCategories, setShowCategories] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntregaModal, setShowEntregaModal] = useState(false);
  const [cep, setCep] = useState("");
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

  const categoryMap: { [key: string]: string[] } = {
    "Materiais de embalagem": ["Embalagens"],
    "Materiais de escritório": ["Escritório"],
    "Roupas, sapatos e chapéus": ["Roupas Femininas", "Calçados", "Acessórios", "Mais Avaliados"], // Added 'Mais Avaliados' as a general clothing/accessories category
    "Utensílios de cozinha e mesa": ["Cozinha"],
    "Perfumes e beleza": [], // No direct match, will return no products unless products.ts is updated
    "Eletrodomésticos": ["Echo e Fire TV", "Mais Vantagens"], // Mapped to closest available
    "Materiais de proteção do trabalho": ["Saúde"], // Mapped to closest available
    "Ferragens e materiais de construção": ["Material de Construção"],
  };

  const performSearch = (term: string, displayCategory: string) => {
    const query = encodeURIComponent(term.trim());
    let productCategories: string[] = [];

    if (displayCategory === "Todos") {
      productCategories = []; // No category filter
    } else {
      productCategories = categoryMap[displayCategory] || [];
    }

    const slugifiedProductCategories = productCategories.map(cat => slugify(cat));
    const categoryQuery = slugifiedProductCategories.length > 0 ? `&category=${encodeURIComponent(slugifiedProductCategories.join(','))}` : "";

    if (query || categoryQuery) {
      router.push(`/produtos?search=${query}${categoryQuery}`);
    } else {
      router.push("/produtos");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm, currentCategory);
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
                      performSearch(searchTerm, cat); // Trigger search immediately
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              performSearch(e.target.value, currentCategory);
            }}
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
        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Olá, {user.name}</span>
            <button
              onClick={logout}
              className="font-semibold px-3 py-2 rounded-md hover:bg-gray-200"
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="font-semibold px-3 py-2 rounded-md hover:bg-gray-200"
          >
            Olá, entrar
          </button>
        )}

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

      {/* ================== NAV MOBILE ================== */}
      <div className="md:hidden bg-white px-4 py-3 flex items-center justify-between border-b">
        <Link href="/" className="text-xl font-bold">
          OkBoss
        </Link>
        <div className="flex items-center gap-3 ml-auto">
          {/* Idioma */}
          <div className="relative">
            <button
              onClick={() => setShowLang((s) => !s)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-200"
            >
              <Image src={currentLang.flag} alt={currentLang.code} width={28} height={18} />
              <span>{currentLang.code}</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* LOGIN / USUÁRIO */}
          <button
            onClick={openAuthModal}
            className="font-semibold px-3 py-2 rounded-md hover:bg-gray-200"
          >
            {user ? `Olá, ${user.name}` : "Entrar"}
          </button>

          {/* Carrinho */}
          <div
            className="cursor-pointer relative flex items-center"
            onClick={() => router.push("/carrinho")}
          >
            <ShoppingCart size={28} />
            <span
              className={`absolute -top-1 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                cart.length > 0 ? "bg-red-600 text-white" : "bg-gray-400 text-white"
              }`}
            >
              {cart.length}
            </span>
          </div>
        </div>
      </div>

      {/* NAV MOBILE PESQUISA */}
      <div className="md:hidden bg-white px-4 py-2 border-b">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 rounded-r-md flex items-center justify-center hover:bg-blue-700"
          >
            <Search size={18} className="text-white" />
          </button>
        </form>
      </div>

      {/* BARRA ESCURA */}
      <div className="bg-[#232f3e] text-white px-4 md:px-8 py-2 flex flex-wrap gap-4 font-semibold text-sm">
        <div className="hidden md:flex gap-4">
          <Link href="/ofertas" className="hover:underline">Ofertas do Dia</Link>
          <Link href="/listas" className="hover:underline">Minhas listas</Link>
          <Link href="/vales" className="hover:underline">Vales-presente</Link>
          <Link href="/atendimento" className="hover:underline">Atendimento ao Cliente</Link>
          <Link href="/vender" className="hover:underline">Vender</Link>
          <Link href="/pedidos-devolucoes" className="hover:underline">Pedidos e Devoluções</Link>
        </div>
        <div className="flex md:hidden gap-4 w-full justify-between">
          <Link href="/ofertas" className="hover:underline">Ofertas</Link>
          <Link href="/listas" className="hover:underline">Listas</Link>
          <Link href="/vales" className="hover:underline">Presente</Link>
          <Link href="/atendimento" className="hover:underline">Atendimento</Link>
          <Link href="/vender" className="hover:underline">Vender</Link>
        </div>
      </div>



     {/* MODAL ENTREGA */}
{showEntregaModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
    <div className="bg-white w-[90%] max-w-md p-8 rounded-2xl shadow-2xl relative animate-fadeIn">
      {/* Botão fechar */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        onClick={() => setShowEntregaModal(false)}
      >
        ×
      </button>

      {/* Título */}
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Escolha sua Localidade</h2>
      <p className="text-center text-gray-500 mb-6">
        As opções de entrega podem variar de acordo com a sua localidade.
      </p>

      {/* Botão de gerenciar endereços */}
      <button className="w-full mb-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-200 transition">
        Gerenciar agenda de endereços
      </button>

      {/* Input para Localidade */}
      <div className="flex mb-6 gap-3">
        <input
          type="text"
          placeholder="Digite sua Localidade"
          value={cep} // renomeie para localidade se quiser
          onChange={(e) => setCep(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (!cep.trim()) {
              alert("Digite uma localidade válida!");
              return;
            }

            // Salva localidade no localStorage
            localStorage.setItem("localidade", cep.trim());

            // Fecha o modal
            setShowEntregaModal(false);

            // Redireciona para a página de produtos ou carrinho
            router.push("/carrinho"); // ou "/produtos" se preferir
          }}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Confirmar
        </button>
      </div>

      {/* Informação extra */}
      <p className="text-sm text-gray-400 text-center">
        Você pode alterar sua localidade a qualquer momento.
      </p>
    </div>
  </div>
)}
    </header>
  );
}
