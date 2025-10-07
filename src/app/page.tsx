import HeroCarousel from "../components/HeroCarousel";
import FeatureGrid from "../components/FeatureGrid";
import Banner from "../components/Banner";

export default function Home() {
  return (
    <main>
      {/* Seção 1 - Carrossel */}
      <HeroCarousel />

      {/* Seção 2 - Grid com 8 Cards */}
      <FeatureGrid />

        <Banner /> {/* nova seção */}
    </main>
  );
}
