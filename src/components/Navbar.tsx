"use client";

import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Grid } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const user = null; // ou { name: "Isabel", email: "isabel@email.com" }
  const logout = () => {};
  const { t } = useLanguage();
  const [locale, setLocale] = useState<"pt" | "en" | "cn">("pt");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categorias = {
    "Todas Categorias": { "Em Destaque": ["Organizadores & Outros", "Verão"] },
    // ... resto das categorias
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* ===== NAVBAR SUPERIOR ===== */}
      <div className="flex items-center w-full px-4 py-4 gap-4 bg-white border-b border-gray-200 shadow-sm">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-10 h-10 rounded-full bg-[#0071BC] flex items-center justify-center text-white font-bold text-xl">
            O
          </div>
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-[#0071BC] hidden md:inline">
            Okbooss
          </span>
        </div>

        {/* Barra de pesquisa */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 mx-4">
          <Search className="absolute left-4 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Pesquisar produtos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-10 py-2 text-sm bg-[#f7f7f7] focus:outline-none focus:ring-2 focus:ring-[#0071BC] transition-all duration-300 focus:w-[105%]"
          />
        </form>

        {/* Ícones à direita */}
        <div className="flex items-center gap-4">
          {/* Carrinho */}
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/carrinho")}
          >
            <ShoppingCart size={22} className="hover:text-[#0071BC]" />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
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

          {/* Elementos do desktop (wishlist, login) */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/lista-desejos">
              <div className="relative flex items-center cursor-pointer hover:text-[#0071BC]">
                <Heart size={22} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
                <span className="ml-2 text-sm font-medium">Lista de Desejos</span>
              </div>
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  👋 {user.name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
                >
                  {t("logout") || "Sair"}
                </button>
              </div>
            ) : (
              <div className="flex items-center cursor-pointer" onClick={() => router.push("/login")}>
                <User size={22} />
                <span className="ml-2 text-sm font-medium">Iniciar Sessão</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== SEGUNDA NAVBAR (informações de contato / promoções) ===== */}
      <div className="bg-[#0071BC] text-white text-sm py-3 shadow-md hidden md:flex">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
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
        </div>
      </div>
    </header>
  );
}
