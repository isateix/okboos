"use client";
import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Globe } from "lucide-react";
import { Facebook, Instagram } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState("pt");

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* ===== NAVBAR PRINCIPAL ===== */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 rounded-full bg-[#0071BC] flex items-center justify-center text-white font-bold text-lg">
              O
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0071BC]">
              Okbooss
            </span>
          </div>

          {/* Barra de pesquisa */}
          <div className="flex-1 mx-6 max-w-xl relative">
            <input
              type="text"
              placeholder="Pesquisar produtos, fornecedores..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BC]"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Ícones */}
          <div className="flex items-center gap-5 text-gray-700">
            <Heart
              size={22}
              className="cursor-pointer hover:text-[#0071BC]"
              title="Lista de desejos"
            />
            <User
              size={22}
              className="cursor-pointer hover:text-[#0071BC]"
              title="Entrar"
              onClick={() => router.push("/login")}
            />
            <ShoppingCart
              size={22}
              className="cursor-pointer hover:text-[#0071BC]"
              title="Carrinho"
            />
          </div>
        </div>

        {/* ===== SEGUNDA NAVBAR (telefones + idioma) ===== */}
        <div className="bg-[#0071BC] text-white text-sm py-2">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
            <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-center md:text-left">
              <span>
                Ligue e faça seu pedido agora:{" "}
                <strong className="font-semibold">938 099 342</strong>
              </span>
              <span>
                Venda em Okbooss:{" "}
                <strong className="font-semibold">922 112 105</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Globe size={18} />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-white text-sm font-medium cursor-pointer focus:outline-none"
              >
                <option value="pt">🇦🇴 PT</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            </div>
          </div>
        </div>
      </header>

  {/* ===== CONTEÚDO PRINCIPAL ===== */}
<main className="flex flex-col md:flex-row justify-center items-start px-4 py-16 bg-gray-50">

  {/* ===== COLUNA ESQUERDA (DOIS QUADRADOS) ===== */}
  <aside className="flex flex-col gap-4 w-64 mr-6">
    {/* Primeiro quadrado cinza */}
    <div className="bg-gray-200 rounded-xl overflow-hidden shadow">
      <img
        src="/images/Mais opções/batedeira.png"
        alt="batedeira"
        className="w-full h-48 object-cover"
      />
    </div>

    {/* Segundo quadrado transparente */}
    <div className="bg-transparent border border-gray-300 rounded-xl overflow-hidden shadow">
      <img
        src="/images/Mais opções/pai e filha.jpg"
        alt="pai e filha"
        className="w-full h-48 object-cover"
      />
    </div>
  </aside>

  {/* ===== CONTEÚDO DIREITO (BOTÕES + GALERIA) ===== */}
  <section className="flex-1 flex flex-col items-center">
    {/* Botões */}
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => router.push("/home")}
        className="bg-[#0071BC] hover:bg-[#005fa3] text-white px-6 py-3 rounded-full font-semibold shadow"
      >
        Explorar Produtos
      </button>
      <button
        onClick={() => router.push("/register")}
        className="border border-[#0071BC] text-[#0071BC] hover:bg-blue-50 px-6 py-3 rounded-full font-semibold"
      >
        Tornar-se Vendedor
      </button>
    </div>

    {/* ===== GALERIA DE PRODUTOS ===== */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-2">
      {[
        "acessorio femenino.png",
        "auriculares branco.png",
        "bag.png",
        "bolsa femenina castanha.png",
        "bolsa femenina rosa.png",
        "fritadeira eletrica.png",
        "crocs preta.png",
        "pratos.png",
        "sandalia femenina.png",
        "tualhas de banho.png",
        "relogio masculino.png",
        "lampadas carregavel.png",
      ].map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
        >
          <img
            src={`/images/Mais opções/${img}`}
            alt={img.replace(".png", "")}
            className="w-full h-40 object-cover"
          />
          <div className="p-3 text-center">
            <h3 className="text-sm font-medium text-gray-800">
              {img.replace(".png", "").replace(/_/g, " ")}
            </h3>
            <p className="text-[#0071BC] font-semibold mt-1">
              Kz {2500 + index * 100}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
</main>

      {/* ===== RODAPÉ ===== */}
      <footer className="bg-[#003D73] text-gray-300 text-sm py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 px-6">
          <div>
            <h4 className="text-white font-semibold mb-2">Contate-nos</h4>
            <ul className="space-y-1">
              <li>Central de Ajuda</li>
              <li>Diretrizes de condição do produto</li>
              <li>Termos e Condições</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Informações</h4>
            <ul className="space-y-1">
              <li>Informações de entrega</li>
              <li>Informações de pagamentos</li>
              <li>Retornar</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Sobre a Okbooss</h4>
            <ul className="space-y-1">
              <li>Vender produtos na Okbooss</li>
              <li>Política de privacidade</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Siga-nos</h4>
            <section className="flex gap-5 mt-5">
              <a
                href="https://www.facebook.com/share/16QH5teFJj/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1877F2] transition"
              >
                <Facebook size={28} />
              </a>
              <a
                href="https://wa.me/244939814478"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition"
              >
                <BsWhatsapp size={28} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
              >
                <Instagram size={28} />
              </a>
              <a
                href="https://www.tiktok.com/@ok.boss00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition"
              >
                <FaTiktok size={28} />
              </a>
            </section>
          </div>
        </div>

        <div className="text-center text-xs mt-8 border-t border-[#004a8f] pt-4">
          © {new Date().getFullYear()} Okbooss. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
