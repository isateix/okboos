"use client";

import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { Heart, ShoppingCart, User, Grid, MessageCircle, Briefcase, Package, Plug, Puzzle, UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { slugify } from "../lib/utils/slugify";
import { useWishlist } from "../context/WishlistContext";
import { useLanguage } from "../context/LanguageContext";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // ✅ ADICIONADO
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { locale, setLocale } = useLanguage();
  const { isSignedIn } = useUser();

  const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/produtos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categorias = [
    { name: "Diversos", icon: Package },
    { name: "Eletrodomésticos", icon: Plug },
    { name: "Brinquedos", icon: Puzzle },
    { name: "Cozinha", icon: UtensilsCrossed },
    { name: "Escritório", icon: Briefcase },
    { name: "Calçados", icon: Briefcase },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* NAVBAR SUPERIOR DESKTOP */}
      <div className="hidden md:flex bg-[#0071BC] text-white text-sm py-2 px-6 justify-center items-center">
        <div className="flex gap-6">
          <span>Ligue e faça seu pedido: <strong>947 965 623</strong></span>
          <span>Venda em Okboss: <strong>947 965 623</strong></span>
        </div>
      </div>

      {/* NAVBAR PRINCIPAL DESKTOP */}
      <div className="hidden md:flex items-center w-full px-6 py-4 gap-6 bg-white border-b border-gray-200 shadow-sm">
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="w-10 h-10 rounded-full bg-[#0071BC] flex items-center justify-center text-white font-bold text-xl">O</div>
          <span className="text-2xl font-bold text-[#0071BC]">Okboss</span>
        </div>

        {/* CATEGORIAS */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 bg-[#0071BC] text-white px-4 py-2 rounded-lg">
            <Grid size={18} />
            <span className="text-sm font-medium">Categorias</span>
          </button>
          {menuOpen && (
            <div className="absolute top-full left-0 bg-white border border-gray-200 w-60 p-4 shadow-lg rounded-lg flex flex-col gap-3">
              {categorias.map(cat => (
                <button
                  key={cat.name}
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
                  onClick={() => {
                    router.push(`/produtos?category=${slugify(cat.name)}`);
                    setMenuOpen(false);
                  }}
                >
                  <cat.icon size={24} className="text-gray-700" />
                  <span className="text-sm">{cat.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PESQUISA */}
        <div className="flex-1 max-w-xl mx-4">
          <input
            type="text"
            placeholder="Pesquisar produtos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>

        {/* AÇÕES DESKTOP */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {/* Wishlist */}
          <div
            className="group flex items-center gap-2 text-gray-700 cursor-pointer hover:text-[#0071BC] hover:scale-105 transition-all"
            onClick={() => router.push("/desejos")}
          >
            <Heart size={22} className={wishlist.length > 0 ? "text-red-500" : ""} />
            <span className="text-sm font-medium">Desejos ({wishlist.length})</span>
          </div>

          {/* Carrinho */}
          <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
            <ShoppingCart size={22} className="text-gray-700 hover:text-[#0071BC] transition-all" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">{totalItems}</span>
            )}
          </div>

          {/* Login / User */}
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="group flex items-center gap-2 text-gray-700 hover:text-[#0071BC] hover:scale-105 transition-all">
                <User size={22} />
                <span className="text-sm font-medium">Entrar</span>
              </button>
            </SignInButton>
          )}

          {/* Idioma */}
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as "pt" | "en" | "cn")}
            className="appearance-none bg-white pl-9 pr-3 py-1 text-sm border border-gray-300 rounded-md cursor-pointer hover:border-[#0071BC] focus:ring-2 focus:ring-[#0071BC]"
            style={{
              backgroundImage: `url(/flags/${locale}.png)`,
              backgroundSize: "18px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "6px center",
            }}
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="cn">中文</option>
          </select>
        </div>
      </div>

      {/* NAVBAR MOBILE */}
      <div className="md:hidden bg-white shadow-sm border-b border-gray-200 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="w-10 h-10 rounded-full bg-[#0071BC] flex items-center justify-center text-white font-extrabold text-3xl cursor-pointer" onClick={() => router.push("/")}>
            O
          </div>

          {/* Pesquisa */}
          <div className="flex-1 mx-2">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full border border-gray-300 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0071BC]"
            />
          </div>

          {/* Carrinho */}
          <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
            <ShoppingCart size={22} className="text-gray-700 hover:text-[#0071BC] transition-all" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">{totalItems}</span>
            )}
          </div>

          {/* Login / User Mobile */}
          <div>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center gap-1 text-gray-700 text-xs">
                  <User size={20} /> Entrar
                </button>
              </SignInButton>
            )}
          </div>

          {/* Idioma */}
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as "pt" | "en" | "cn")}
            className="appearance-none bg-white pl-8 pr-2 py-1 text-xs border border-gray-300 rounded-md hover:border-[#0071BC] transition"
            style={{
              backgroundImage: `url(/flags/${locale}.png)`,
              backgroundSize: "16px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "4px center",
            }}
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="cn">CN</option>
          </select>
        </div>
      </div>

      {/* NAV INFERIOR MOBILE */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden">
        <div className="flex justify-around items-center py-2">
          <button className="flex flex-col items-center text-gray-700" onClick={() => router.push("/")}>
            <FiHome size={24} />
            <span className="text-xs">Home</span>
          </button>

          <button className="flex flex-col items-center text-gray-700" onClick={() => setShowCategories(true)}>
            <Grid size={24} />
            <span className="text-xs">Categorias</span>
          </button>

          {/* Botão do Chat */}
          <button
            className="flex flex-col items-center text-gray-700"
            onClick={() => setChatOpen(true)}
          >
            <MessageCircle size={24} />
            <span className="text-xs">Chat</span>
          </button>

          <div className="group flex items-center gap-2 text-gray-700 cursor-pointer hover:text-[#0071BC] hover:scale-105 transition-all" onClick={() => router.push("/desejos")}>
            <Heart size={22} className={wishlist.length > 0 ? "text-red-500" : ""} />
            <span className="text-sm font-medium">Desejos ({wishlist.length})</span>
          </div>

          <div>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="flex flex-col items-center text-gray-700 text-xs">
                  <User size={20} />
                  <span>Entrar</span>
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </nav>

      {/* BOTTOM SHEET CATEGORIAS MOBILE */}
      {showCategories && (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50" onClick={() => setShowCategories(false)}>
          <div className="w-full bg-white rounded-t-2xl p-5 pb-10 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-center font-semibold text-lg mb-4">Categorias</h3>
            <div className="flex flex-col gap-4">
              {categorias.map(cat => (
                <button
                  key={cat.name}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
                  onClick={() => {
                    router.push(`/produtos?category=${slugify(cat.name)}`);
                    setShowCategories(false);
                  }}
                >
                  <cat.icon size={28} className="text-gray-700" />
                  <span className="text-sm">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal do Chat */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-sm p-4 rounded-2xl shadow-lg relative">
            <button
              onClick={() => setChatOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0071BC] rounded-full flex items-center justify-center text-white font-bold">
                  B
                </div>
                <div>
                  <p className="font-bold text-[#0071BC]">OkBoss</p>
                  <p className="text-gray-700 text-sm">Converse conosco</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 text-gray-700 text-sm">
                Olá! Preciso de ajuda? Entre em contato conosco aqui mesmo e entraremos em contato com você assim que possível!
              </div>

              <input
                type="text"
                placeholder="Escreva sua mensagem..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BC]"
              />
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
