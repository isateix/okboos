"use client";
import HeroCarousel from "../../components/HeroCarousel";
import FeatureGrid from "../../components/FeatureGrid";
import Banner from "../../components/Banner";
import NovaSecao1 from "../../components/Secao1";
import Secao2 from "../../components/Secao2";
import Secao3 from "../../components/Secao3";
import Secao4 from "../../components/Secao4";
import Secao5 from "../../components/Secao5";
import Secao6 from "../../components/Secao6";
import Secao7 from "../../components/Secao7";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <main>
      {/* Hero principal */}
      <HeroCarousel />

      {/* Vantagens / recursos */}
      <FeatureGrid />

      {/* Banner promocional */}
      <Banner />

      {/* Categorias ou produtos em destaque */}
      <NovaSecao1 />

      {/* Compre direto da fábrica */}
      <Secao2 />

      {/* Negocie com confiança */}
      <Secao3 />

      {/* Outras seções / novas features */}
      <Secao4 />
      <Secao5 />
      <Secao6 />
      <Secao7 />

      {/* Rodapé */}
      <Footer />
    </main>
  );
}
