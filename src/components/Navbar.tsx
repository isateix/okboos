"use client";

import { useState } from "react";
import { ShoppingCart, Search, Globe, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`);
    setSearchVisible(false);
    setSearchTerm("");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-wide">OkBoss</h1>
        <p className="text-sm text-gray-200 -mt-1">Comércio e Serviços</p>
      </div>

      {/* Links Desktop */}
      <ul className="hidden md:flex gap-6 text-lg font-medium">
        <li><Link href="/">Início</Link></li>
        <li><Link href="/produtos">Produtos</Link></li>
        <li><Link href="/sobre">Sobre</Link></li>
        <li><Link href="/contactos">Contactos</Link></li>
      </ul>

      {/* Ações */}
      <div className="flex items-center gap-4">
        {/* Lupa */}
        <button
          onClick={() => setSearchVisible(!searchVisible)}
          className="hover:text-gray-300"
        >
          <Search size={22} />
        </button>

        {/* Carrinho */}
        <button
          onClick={() => router.push("/carrinho")}
          className="hover:text-gray-300"
        >
          <ShoppingCart size={22} />
        </button>

        {/* Idioma */}
        <button
          onClick={() => alert("Alternar idioma")}
          className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-800 flex items-center gap-1"
        >
          <Globe size={18} /> PT
        </button>

        <Link
          href="/login"
          className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          Entrar
        </Link>

        {/* Menu Mobile */}
        <button
          className="md:hidden hover:text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {menuOpen && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-blue-700 text-white flex flex-col gap-4 px-6 py-4">
          <li><Link href="/">Início</Link></li>
          <li><Link href="/produtos">Produtos</Link></li>
          <li><Link href="/sobre">Sobre</Link></li>
          <li><Link href="/contactos">Contactos</Link></li>
        </ul>
      )}

      {/* Barra de pesquisa */}
      {searchVisible && (
        <form
          onSubmit={handleSearchSubmit}
          className="absolute top-full left-0 w-full bg-white text-black px-6 py-4 shadow-md flex gap-2"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar produtos..."
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </form>
      )}
    </nav>
  );
}
