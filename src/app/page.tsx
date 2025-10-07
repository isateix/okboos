import HeroCarousel from "../components/HeroCarousel";
import FeatureGrid from "../components/FeatureGrid";
import Banner from "../components/Banner";
import NovaSecao1 from "../components/Secao1";
//import NovaSecao2 from "../components/NovaSecao2";  {/* Nova Seção 2 */}  <NovaSecao2 />
//import NovaSecao3 from "../components/NovaSecao3";   {/* Nova Seção 3 */} <NovaSecao3 />

export default function Home() {
  return (
    <main>
      {/* Seção 1 - Carrossel */}
      <HeroCarousel />

      {/* Seção 2 - Grid com 8 Cards */}
      <FeatureGrid />

      {/* Seção 3 - Banner */}
      <Banner />

      {/* Nova Seção 1 */}
      <NovaSecao1 />

      
    </main>
  );
}
