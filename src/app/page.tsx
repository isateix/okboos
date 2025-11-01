"use client";

import Navbar from "../components/Navbar"; // Navbar no topo
import Secao8 from "../components/Secao8";
import Secao9 from "../components/Secao9";
import Secao10 from "../components/Secao10";
import Secao11 from "../components/Secao11";
import Secao12 from "../components/Secao12";
import Secao13 from "../components/Secao13";
import Secao14 from "../components/Secao14";
import Secao15 from "../components/Secao15";
import Secao16 from "../components/Secao16";
import Secao17 from "../components/Secao17";
import Secao18 from "../components/Secao18";
import Secao19 from "../components/Secao19";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav"; // ajusta o caminho se necessário

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar /> {/* sempre no topo */}
      <main>
        {/* Secao8 → TopoDestaque: seção grande no topo */}
        <Secao8 />

        {/* Secao9 → Vantagens/Recursos: pequenas caixas com ícones ou checkmarks */}
        <Secao9 />

        {/* Secao10 → Banner Promocional: uma seção maior abaixo das vantagens */}
        <Secao10 />

        {/* Secao11 → Categorias em destaque: quadrados com imagens de categorias */}
        <Secao11 />

        {/* Secao12 → Produtos: grid com nome e preço do produto */}
        <Secao12 />

        {/* Secao13 → Produtos em destaque ou promoções */}
        <Secao13 />

        {/* Secao14 → Banner promocional secundário ou categoria em destaque */}
        <Secao14 />

        {/* Secao15 → Produtos por categoria específica */}
        <Secao15 />

        {/* Secao16 → Promoções relâmpago ou ofertas do dia */}
        <Secao16 />

        {/* Secao17 → Novidades / lançamentos */}
        <Secao17 />

        {/* Secao18 → Produtos mais vendidos / populares */}
        <Secao18 />

        {/* Secao19 → Última seção de promoções ou CTA final */}
        <Secao19 />
      </main>
     <BottomNav /> {/* barra inferior fixa no mobile */}
<Footer />
    </div>
  );
}
