"use client";

import { useState, useEffect } from "react";
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
  const [productsPanelOpen, setProductsPanelOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
const [showSupplierForm, setShowSupplierForm] = useState(false);
const [showFeaturedBanner, setShowFeaturedBanner] = useState(false);
const [showProtectionsBanner, setShowProtectionsBanner] = useState(false);
const [showBuyerCenter, setShowBuyerCenter] = useState(false);
const [showSupportCenter, setShowSupportCenter] = useState(false);


  useEffect(() => {
  if (typeof window === "undefined") return;

  const handleInteraction = (event: MouseEvent) => {
    if (window.innerWidth >= 768) {
      const target = event.target as HTMLElement;
      const clickedInsidePanel = target.closest(".categories-panel");
      const clickedButton = target.closest(".open-categories-btn");

      // só fecha se não for no painel nem no botão
      if (!clickedInsidePanel && !clickedButton) {
        setCategoriesPanelOpen(false);
        setProductsPanelOpen(false);
      }
    }
  };

  window.addEventListener("click", handleInteraction);
  return () => window.removeEventListener("click", handleInteraction);
}, []);
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim())
      router.push(`/produtos?search=${encodeURIComponent(searchTerm.trim())}`);
    else router.push("/produtos");
  };

  const categories = [
    { label: t("categories.Meio Ambiente"), icon: FaLeaf },
    { label: t("categories.Aparelhos Eletrônicos"), icon: FaLaptop },
    { label: t("categories.Casa e Jardim"), icon: FaHome },
    { label: t("categories.Esportes e Entretenimento"), icon: FaFootballBall },
    { label: t("categories.Peças e Acessórios para Veículo"), icon: FaCar },
    { label: t("categories.Beleza e cuidados pessoais"), icon: FaGift },
    { label: t("categories.Máquinas e Indústrias"), icon: FaTools },
    { label: t("categories.Móveis"), icon: FaHome },
    { label: t("categories.Mãe, crianças e brinquedos"), icon: FaTshirt },
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
    { label: t("categories.Material de Escritório e Escolar"), icon: FaLaptop },
    { label: t("categories.Acessórios e Telecomunicações"), icon: FaLaptop },
    { label: t("categories.Materiais e Aparelhos Médicos"), icon: FaRegClock },
    { label: t("categories.Comida e Bebida"), icon: FaGift },
    { label: t("categories.Proteção, Borracha e Plásticos"), icon: FaRegClock },
    { label: t("categories.Roupa"), icon: FaTshirt },
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
    { label: "becomeSupplier", href: "/fornecedor" },
  ];
  

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* 🧭 DESKTOP HEADER */}
      <div className="hidden md:flex flex-col">
        <div className="flex items-center justify-between px-8 py-3">
       <div
  onClick={() => router.push("/")}
  className="text-2xl font-bold text-[#ff5000] cursor-pointer hover:text-[#e14a00] transition relative z-[300]"
>
  OkBoss.com
</div>

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
  onClick={() => router.push("/signup")}
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
  {/* Botão de categorias */}
  <button
    onClick={() => setCategoriesPanelOpen(true)}
    className="open-categories-btn flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
  >
    <Menu size={20} /> {t("allCategories")}
  </button>

  {/* Links principais com tradução */}
 <button
  onClick={() => setShowFeaturedBanner(true)}
  className="hover:text-[#ff5000]"
>
  {t("featuredSelections")}
</button>
  <button
  onClick={() => setShowProtectionsBanner(true)}
  className="hover:text-[#ff5000]"
>
  {t("orderProtections")}
</button>

  <button
  onClick={() => setShowBuyerCenter(true)}
  className="hover:text-[#ff5000]"
>
  Central dos Compradores
</button>

  <button onClick={() => setShowSupportCenter(true)}>
  Atendimento ao Cliente
</button>

  <Link href="/fornecedor" className="hover:text-[#ff5000]">
    {t("becomeSupplier")}
  </Link>
</div>
</div>

      {/* 📱 MOBILE HEADER */}
      <div className="md:hidden flex flex-col">
        {/* Topo: logo, pesquisa, idioma */}
        <div className="flex items-center justify-between px-4 py-2">
         <div
  onClick={() => router.push("/")}
  className="text-xl font-bold text-[#ff5000] cursor-pointer hover:text-[#e14a00] transition relative z-[300]"
>
  OkBoss.com
</div>
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
  onClick={() => router.push("/signup")}
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
    className={`categories-panel ${
      typeof window !== "undefined" && window.innerWidth >= 768
        ? "fixed top-[120px] left-0 w-full h-[calc(100vh-120px)]"
        : "absolute top-[104px] left-0 w-full h-auto"
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
                selectedCategory === cat.label ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedCategory(cat.label);
                if (window.innerWidth < 768) {
                  setCategoriesPanelOpen(false);
                  setProductsPanelOpen(true);
                }
              }}
            >
              <Icon size={18} /> {t(cat.label)}
            </li>
          );
        })}
      </ul>
    </div>

    {/* Lado direito: produtos filtrados (desktop) */}
    {selectedCategory && window.innerWidth >= 768 && (
      <div className="w-full md:w-4/5 p-4 overflow-y-auto h-[calc(100vh-120px)]">
        <h2 className="text-lg font-semibold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 justify-items-center">
          {products
            .filter((product) => product.category === selectedCategory)
            .slice(0, 12)
            .map((product) => (
              <div key={product.id} className="flex flex-col items-center justify-start cursor-pointer w-40">
                <div className="w-40 h-40 bg-gray-200 flex items-center justify-center overflow-hidden hover:shadow-lg transition">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <span className="mt-2 text-sm text-center font-medium">{product.name}</span>
              </div>
            ))}
        </div>
      </div>
    )}
  </div>
)}

{/* 🧩 Painel de produtos MOBILE (abre sobreposto) */}
{productsPanelOpen && selectedCategory && (
  <div className="fixed top-[104px] left-0 w-full h-[calc(100vh-104px)] bg-white z-[90] overflow-y-auto shadow-lg p-4 transition-transform duration-300">
    <button
      className="mb-4 text-sm text-gray-500"
      onClick={() => {
        setProductsPanelOpen(false);
        setCategoriesPanelOpen(true); // volta para o painel de categorias
      }}
    >
      ← {t("backToCategories")}
    </button>
    <h2 className="text-lg font-semibold mb-4">{selectedCategory}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 justify-items-center">
      {products
        .filter((product) => product.category === selectedCategory)
        .slice(0, 12)
        .map((product) => (
          <div key={product.id} className="flex flex-col items-center justify-start cursor-pointer w-32 sm:w-36">
            <div className="w-32 sm:w-36 h-32 sm:h-36 bg-gray-200 flex items-center justify-center overflow-hidden hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <span className="mt-2 text-xs sm:text-sm text-center font-medium">{product.name}</span>
          </div>
        ))}
    </div>
  </div>
)}
{showFeaturedBanner && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
    <div className="relative w-full md:w-3/4 h-[50vh] flex flex-col items-center justify-center backdrop-blur-lg rounded-2xl bg-white/10 border border-white/20 shadow-2xl">
      {/* Botão Fechar */}
      <button
        onClick={() => setShowFeaturedBanner(false)}
        className="absolute top-4 right-6 text-white text-3xl hover:text-[#ff5000] transition"
      >
        ✕
      </button>

      {/* Título */}
      <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-md">
        Seleções em Destaque
      </h2>

      {/* Botões com ícones */}
      <div className="flex flex-col md:flex-row gap-6 text-white text-center">
        <a
          href="/melhores-classificados"
          className="flex flex-col items-center justify-center px-8 py-6 bg-[#ff5000]/90 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105"
        >
          <span className="text-5xl mb-2">⭐</span>
          <span className="text-lg font-semibold">Melhores Classificados</span>
        </a>

        <a
          href="/novidades"
          className="flex flex-col items-center justify-center px-8 py-6 bg-[#ff5000]/90 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105"
        >
          <span className="text-5xl mb-2">🆕</span>
          <span className="text-lg font-semibold">Novidades</span>
        </a>

        <a
          href="/melhores-ofertas"
          className="flex flex-col items-center justify-center px-8 py-6 bg-[#ff5000]/90 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105"
        >
          <span className="text-5xl mb-2">💸</span>
          <span className="text-lg font-semibold">Melhores Ofertas</span>
        </a>
      </div>
    </div>
  </div>
)}
{showProtectionsBanner && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
    <div className="relative w-full md:w-3/4 lg:w-2/3 h-auto py-12 flex flex-col items-center justify-center backdrop-blur-lg rounded-2xl bg-white/10 border border-white/20 shadow-2xl text-white">

      {/* Botão Fechar */}
      <button
        onClick={() => setShowProtectionsBanner(false)}
        className="absolute top-4 right-6 text-white text-3xl hover:text-[#ff5000] transition"
      >
        ✕
      </button>

      {/* Título */}
      <p className="text-lg text-gray-200 mb-10 text-center max-w-xl">
        Desfrute de proteção desde o pagamento até a entrega
      </p>

      {/* Opções de proteção */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        {/* 1️⃣ Pagamentos Seguros */}
        <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
          <span className="text-5xl mb-3">💳</span>
          <h3 className="text-xl font-semibold mb-1">Pagamentos seguros e fáceis</h3>
          <p className="text-sm text-white/90 max-w-xs">
            Seus pagamentos são protegidos por sistemas confiáveis e seguros.
          </p>
        </div>

        {/* 2️⃣ Política de Reembolso */}
        <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
          <span className="text-5xl mb-3">💰</span>
          <h3 className="text-xl font-semibold mb-1">Política de reembolso</h3>
          <p className="text-sm text-white/90 max-w-xs">
            Receba seu dinheiro de volta caso algo saia diferente do combinado.
          </p>
        </div>

        {/* 3️⃣ Transporte e Logística */}
        <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
          <span className="text-5xl mb-3">🚚</span>
          <h3 className="text-xl font-semibold mb-1">Serviços de transporte e logística</h3>
          <p className="text-sm text-white/90 max-w-xs">
            Opções confiáveis para envio e rastreamento internacional.
          </p>
        </div>

        {/* 4️⃣ Proteções pós-venda */}
        <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
          <span className="text-5xl mb-3">🛡️</span>
          <h3 className="text-xl font-semibold mb-1">Proteções pós-venda</h3>
          <p className="text-sm text-white/90 max-w-xs">
            Assistência após a entrega para garantir total satisfação.
          </p>
        </div>
      </div>

      {/* Botão Saiba mais */}
      <a
        href="/pagamentos-e-protecoes"
        className="mt-8 inline-flex items-center gap-2 bg-white text-[#ff5000] font-semibold px-6 py-2 rounded-full hover:bg-[#ff5000] hover:text-white transition"
      >
        Saber Mais
      </a>

    </div>
  </div>
)}

{showBuyerCenter && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
    <div className="relative w-full md:w-3/4 lg:w-2/3 py-10 px-6 flex flex-col items-center justify-center backdrop-blur-lg rounded-2xl bg-white/10 border border-white/20 shadow-2xl text-white">

      {/* Botão Fechar (ajustado para não ficar atrás da navbar) */}
<button 
  onClick={() => setShowBuyerCenter(false)}
  className="absolute top-12 right-8 text-white text-3xl hover:text-[#ff5000] transition"
>
  ✕
</button>

      {/* Cabeçalho */}

      <p className="text-lg text-gray-200 mb-10 text-center max-w-xl">
        Comece a explorar e aproveite todos os recursos disponíveis.
      </p>

 {/* Seções resumidas e adaptadas */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">

  {/* 1️⃣ Sobre */}
  <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
    <span className="text-5xl mb-3">📘</span>
    <h3 className="text-xl font-semibold mb-2">Sobre nós</h3>
    <ul className="text-sm text-white/90 space-y-1">
      <li>
        <a href="/sobre#sobre-nos" className="hover:underline">
          O que é o site
        </a>
      </li>
      <li>
        <a href="/sobre#sobre-nos" className="hover:underline">
          Por que escolher-nos
        </a>
      </li>
      <li>
        <a href="/sobre#sobre-nos" className="hover:underline">
          Planos e assinaturas
        </a>
      </li>
    </ul>
  </div>

  {/* 2️⃣ Compras e Serviços */}
  <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
    <span className="text-5xl mb-3">🛍️</span>
    <h3 className="text-xl font-semibold mb-2">Compras e Serviços</h3>
    <ul className="text-sm text-white/90 space-y-1">
      <li>
        <a href="/sobre#compras-servicos" className="hover:underline">
          Como comprar
        </a>
      </li>
      <li>
        <a href="/sobre#compras-servicos" className="hover:underline">
          Serviços disponíveis
        </a>
      </li>
      <li>
        <a href="/sobre#compras-servicos" className="hover:underline">
          Proteções ao comprador
        </a>
      </li>
    </ul>
  </div>

  {/* 3️⃣ Finanças e Garantias */}
  <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
    <span className="text-5xl mb-3">💳</span>
    <h3 className="text-xl font-semibold mb-2">Finanças e Garantias</h3>
    <ul className="text-sm text-white/90 space-y-1">
      <li>
        <a href="/sobre#financas-garantias" className="hover:underline">
          Crédito fácil
        </a>
      </li>
      <li>
        <a href="/sobre#financas-garantias" className="hover:underline">
          Serviço de inspeção
        </a>
      </li>
      <li>
        <a href="/sobre#financas-garantias" className="hover:underline">
          Conformidade fiscal
        </a>
      </li>
    </ul>
  </div>

{/* 4️⃣ Recursos e Ajuda */}
<div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
  <span className="text-5xl mb-3">📞</span>
  <h3 className="text-xl font-semibold mb-2">Suporte e Conteúdo</h3>
  <ul className="text-sm text-white/90 space-y-1">
    {/* Link para o blog na página Sobre */}
    <li>
      <a href="/sobre" className="hover:underline">
        Blog e dicas
      </a>
    </li>

    {/* Histórias de sucesso */}
  <li>
    <Link
      href="/"
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById("secao5");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="hover:underline"
    >
      Histórias de sucesso
    </Link>
  </li>

    {/* Link para atendimento de clientes */}
    <li>
      <a href="/contacto" className="hover:underline">
        Atendimento
      </a>
    </li>
  </ul>
</div>
</div>

    </div>
  </div>
)}
{showSupportCenter && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
    <div className="relative w-full md:w-3/4 lg:w-2/3 py-10 px-6 flex flex-col items-center justify-center backdrop-blur-lg rounded-2xl bg-white/10 border border-white/20 shadow-2xl text-white">

      {/* Botão Fechar */}
      <button
        onClick={() => setShowSupportCenter(false)}
        className="absolute top-6 right-8 text-white text-3xl hover:text-[#ff5000] transition"
      >
        ✕
      </button>

      {/* Cabeçalho */}
      <h2 className="text-3xl font-bold mb-3 drop-shadow-md">Atendimento ao Cliente</h2>
      <p className="text-lg text-gray-200 mb-10 text-center max-w-xl">
        Escolha a forma de atendimento ideal para você.
      </p>

      {/* Opções de Atendimento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">

        {/* 1️⃣ Para Clientes */}
        <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
          <span className="text-5xl mb-3">👥</span>
          <h3 className="text-xl font-semibold mb-2">Para Clientes</h3>
          <p className="text-sm text-white/90 mb-4">
            Entre em contacto com nossa equipe para dúvidas, sugestões ou suporte.
          </p>
          <a
            href="/contacto"
            className="bg-white text-[#ff5000] px-6 py-2 rounded-full font-semibold hover:bg-[#ff5000] hover:text-white transition"
          >
            Aceder
          </a>
        </div>

        {/* 2️⃣ Para Fornecedores */}
        <div className="flex flex-col items-center justify-center bg-[#ff5000]/90 px-8 py-6 rounded-xl shadow-lg hover:bg-[#e04b00] transition transform hover:scale-105">
          <span className="text-5xl mb-3">🏢</span>
          <h3 className="text-xl font-semibold mb-2">Para Fornecedores</h3>
          <p className="text-sm text-white/90 mb-4">
            Precisa de ajuda com pedidos, entregas ou suporte comercial? Fale conosco.
          </p>
          <a
            href="/fornecedor/atendimento-fornecedor"
            className="bg-white text-[#ff5000] px-6 py-2 rounded-full font-semibold hover:bg-[#ff5000] hover:text-white transition"
          >
            Aceder
          </a>
        </div>

      </div>
    </div>
  </div>
)}

</header>

  );
}
