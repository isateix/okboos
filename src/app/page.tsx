import HeroCarousel from "../components/HeroCarousel";
import FeatureGrid from "../components/FeatureGrid";
import Banner from "../components/Banner";
import NovaSecao1 from "../components/Secao1";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <FeatureGrid />
      <Banner />
      <NovaSecao1 />
       <Footer /> {/* ✅ Aqui ele vai aparecer no final da página */}
    </main>
  );
}
