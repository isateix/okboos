"use client";

import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Globe,
  Grid,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const { wishlist } = useWishlist(); // ✅ Usa o contexto da wishlist
  const user = null; // ou um objeto de teste { name: "Isabel", email: "isabel@email.com" }
  const logout = () => {}; // função vazia temporária
  const [lang, setLang] = useState("pt");
  const { t } = useLanguage();
  const [locale, setLocale] = useState<"pt" | "en" | "cn">("pt");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const categorias = {
    "Todas Categorias": {
      "Em Destaque": [
        "Organizadores & Outros",
        "Verão",
        "Luzes de Neon",
        "Porta Chaves",
        "Desporto",
        "Facilitadores de Cozinha",
        "Essenciais",
        "Limpeza",
        "Acessórios para WC",
        "Garrafa de água",
        "Acessórios Carros",
        "Enfeites Para Festas",
        "Roupa de cama",
        "Sinalização",
      ],
      "Beleza e Saúde": [
        "Cosméticos",
        "Maquilhagem",
        "Higiene Pessoal",
        "Perfumes",
        "Aparelhos para penteados",
        "Necessidades",
      ],
    },
    "Eletrodoméstico": {
      "Grandes Eletrodomésticos": [
        "Esquentador de Água",
        "Máquinas De Lavar E Secar",
        "Ar Condicionados",
        "Produtos Comerciais",
        "Fogões e Fornos",
        "Geladeiras",
        "Arcas",
        "Frigobar e Bebedor",
        "Exaustor",
        "Acessórios",
      ],
      "Pequenos Eletrodomésticos": [
        "Liquidificadores",
        "Micro-ondas e Mini Fornos",
        "Grelhadores e Torradeiras",
        "Balanças e Outros",
        "Ventiladores e Aspiradores",
        "Ferros de Engomar",
        "Batedeiras e Varinhas",
      ],
      Som: ["Som", "Acessórios de TV"],
    },
    "Escritório e Escola": {
      Materiais: [
        "Diversos",
        "Agrafador e Mais",
        "Máquinas",
        "Mochilas",
        "Cadernos e Mais",
        "Capas",
        "Envelopes",
        "Papel Cartolina",
        "Consumiveis",
        "Canetas, Lápis e Mais",
        "Quadros",
        "Tintas",
        "Utilidades",
        "Tesouras",
        "Régua",
        "Cola",
        "Compasso",
      ],
      "Artigos de Escritórios": ["Cadeiras", "Armários", "Mobílias", "Cofres"],
    },
    Roupa: {
      "Roupas & Acessórios": [
        "Masculinas",
        "Femininas",
        "Meias",
        "Acessórios Masculinos",
        "Acessórios Femininos",
        "Chinelas & Sandál",
      ],
    },
    Brinquedos: {
      Brinquedos: [
        "Brinquedos Tradicionais",
        "Brinquedos Educativos",
        "Brinquedos Eletrônicos",
        "Brinquedos para Exterior",
        "Brinquedos para Bebés",
        "Acessórios e Outros",
      ],
    },
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* NAVBAR PRINCIPAL */}
      <div className="flex items-center w-full px-4 py-6 gap-6 bg-white border-b border-gray-200 shadow-sm">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-10 h-10 rounded-full bg-[#0071BC] flex items-center justify-center text-white font-bold text-xl">
            O
          </div>
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-[#0071BC]">
            Okbooss
          </span>
        </div>

        {/* Menu de Categorias + Pesquisa */}
        <div className="flex items-center flex-1 relative gap-3">
        {/* Botão de categorias */}
<div className="relative">
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="flex items-center gap-2 bg-[#0071BC] text-white px-4 py-2 rounded-lg hover:bg-[#005c9d] transition whitespace-nowrap"
  >
    <Grid size={18} />
    <span className="text-sm font-medium">Categorias</span>
  </button>

  {/* Menu principal */}
  {menuOpen && (
    <div
      className="absolute top-[106px] left-0 flex bg-white border border-gray-200 shadow-lg rounded-none z-50"
      onMouseLeave={() => setMenuOpen(false)} // Fecha o menu ao sair
    >
      {/* Menu lateral */}
      <div className="w-[300px] h-[400px] p-2 overflow-y-auto flex flex-col border-r border-gray-200">
        {Object.keys(categorias).map((cat) => (
          <div
            key={cat}
            className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 rounded ${
              hoveredCategory === cat ? "bg-gray-100" : ""
            }`}
            onMouseEnter={() => setHoveredCategory(cat)}
          >
            <span>{cat}</span>
            <span>▶</span>
          </div>
        ))}
      </div>

      {/* Submenu */}
      {hoveredCategory && (
        <div
          className="w-[60vw] h-[400px] overflow-y-auto bg-white p-4 shadow-inner"
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            scrollbarColor: "#0071BC #f1f1f1",
          }}
        >
          <div
            className={`grid ${
              hoveredCategory === "Eletrodoméstico"
                ? "grid-cols-3"
                : "grid-cols-2"
            } gap-6`}
          >
            {Object.entries(categorias[hoveredCategory]).map(
              ([titulo, itens]) => (
                <div key={titulo}>
                  <h3 className="font-bold text-gray-800 mb-2">{titulo}</h3>
                  <ul className="space-y-1">
                    {itens.map((item) => (
                      <li
                        key={item}
                        onClick={() =>
                          router.push(
                            `/produtos?category=${encodeURIComponent(item)}`
                          )
                        }
                        className="text-sm text-gray-700 hover:text-[#0071BC] cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )}
</div>

{/* 🔍 Barra de pesquisa */}
<form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-2xl mx-4">
  <Search className="absolute left-4 top-2.5 text-gray-400" size={18} />
  <input
    type="text"
    placeholder="Pesquisar produtos"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full border border-gray-300 rounded-full px-10 py-2 text-sm bg-[#f7f7f7] focus:outline-none focus:ring-2 focus:ring-[#0071BC] transition-all duration-300 focus:w-[105%]"
  />
</form>

        </div>

        {/* Ícones à direita */}
        <div className="flex items-center gap-6 text-gray-700 ml-auto">
          {/* ❤️ Lista de Desejos */}
          <Link href="/lista-desejos" title="Lista de Desejos">
            <div className="relative flex items-center cursor-pointer hover:text-[#0071BC]">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
              <span className="ml-2 text-sm font-medium hidden md:inline">
                Lista de Desejos
              </span>
            </div>
          </Link>

     {/* 👤 Login */}
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
  <div className="flex items-center gap-3">
    <div
      className="flex items-center cursor-pointer hover:text-gray-700"
      onClick={() => router.push("/login")}
      title="Iniciar Sessão"
    >
      <User size={22} />
      <span className="ml-2 text-sm font-medium hidden md:inline">Iniciar Sessão</span>
    </div>
  </div>
)}

          {/* 🛒 Carrinho */}
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/carrinho")}
            title="Carrinho"
          >
            <ShoppingCart size={22} className="hover:text-[#0071BC]" />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

{/* SEGUNDA NAVBAR */}
<div className="bg-[#0071BC] text-white text-sm py-3 shadow-md">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
    {/* Texto centralizado */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
      <span>
        Ligue e faça seu pedido agora:{" "}
        <strong className="font-semibold">938 099 342</strong>
      </span>
      <span>
        Venda em Okbooss:{" "}
        <strong className="font-semibold">922 112 105</strong>
      </span>
    </div>

    {/* Idioma */}
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-md p-1 bg-[#0071BC] text-white">
        <img
          src={`/flags/${locale}.png`}
          alt={locale}
          className="w-5 h-5"
        />
        <select
          value={locale}
          onChange={(e) =>
            setLocale(e.target.value as "pt" | "en" | "cn")
          }
          className="ml-1 bg-[#0071BC] text-white border-none outline-none appearance-none cursor-pointer"
        >
          <option value="pt">PT</option>
          <option value="en">EN</option>
          <option value="cn">CN</option>
        </select>

      </div>
    </div>
  </div>
</div>
    </header>
  );
}
