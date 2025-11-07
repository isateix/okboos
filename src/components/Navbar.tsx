"use client";

import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { Heart, ShoppingCart, User, Grid } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from '../context/CartContext';
// import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"; // 🔹 Clerk comentado

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState<"pt" | "en" | "cn">("pt");
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/produtos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* NAVBAR SUPERIOR - Desktop */}
      <div className="hidden md:flex bg-[#0071BC] text-white text-sm py-2 px-6 justify-center items-center">
        <div className="flex gap-6">
          <span>Ligue e faça seu pedido: <strong>947 965 623</strong></span>
          <span>Venda em Okboss: <strong>947 965 623</strong></span>
        </div>
      </div>

      {/* NAVBAR PRINCIPAL - Desktop */}
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
            <div className="absolute top-full left-0 bg-white border border-gray-200 w-60 p-2 shadow-lg">
              <p className="text-gray-700">Categorias aqui...</p>
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

        {/* AÇÕES (Desejos / Carrinho / Login) */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <div className="group flex items-center gap-2 text-gray-700 cursor-pointer hover:text-[#0071BC] hover:scale-105 transition-all">
            <Heart size={22} />
            <span className="text-sm font-medium">Desejos</span>
          </div>

          {/* Carrinho */}
          <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
            <ShoppingCart size={22} className="text-gray-700 hover:text-[#0071BC] transition-all" />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {/* Login / Perfil */}
          {/*
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group flex items-center gap-2 text-gray-700 hover:text-[#0071BC] hover:scale-105 transition-all">
                <User size={22} />
                <span className="text-sm font-medium">Entrar</span>
              </button>
            </SignInButton>
          </SignedOut>
          */}

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
          <div className="w-10 h-10 rounded-full bg-[#0071BC] flex items-center justify-center text-white font-extrabold text-3xl cursor-pointer"
               onClick={() => router.push("/")}>
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
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {/* Idioma */}
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as "pt" | "en" | "cn")}
            className="appearance-none bg-white pl-8 pr-1 py-1 text-xs border border-gray-300 rounded-md"
            style={{
              backgroundImage: `url(/flags/${locale}.png)`,
              backgroundSize: "16px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "4px center",
            }}
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="cn">中文</option>
          </select>
        </div>

        {/* Barra inferior mobile */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md">
          <div className="flex justify-around items-center py-2">
            <button className="flex flex-col items-center text-gray-700">
              <FiHome size={24} />
              <span className="text-xs">Home</span>
            </button>

            <button className="flex flex-col items-center text-gray-700">
              <Grid size={24} />
              <span className="text-xs">Categorias</span>
            </button>

            <button className="flex flex-col items-center text-gray-700">
              <Heart size={24} />
              <span className="text-xs">Desejos</span>
            </button>

            <button className="flex flex-col items-center text-gray-700">
              <ShoppingCart size={24} />
              <span className="text-xs">Carrinho</span>
            </button>

            {/*
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex flex-col items-center text-gray-700">
                  <User size={24} />
                  <span className="text-xs">Entrar</span>
                </button>
              </SignInButton>
            </SignedOut>
            */}
          </div>
        </nav>
      </div>
    </header>
  );
}
