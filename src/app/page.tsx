'use client';

import { useRouter } from "next/navigation";
import { products } from '../data/products';
import CarouselBanner from '../components/CarouselBanner';
import ProductsList from '../components/ProductsList'; // ✅ usamos ProductsList
import Secao21 from '../components/Secao21';
import Secao22 from '../components/Secao22';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();

  // Produtos específicos para o banner
  const carouselProducts = products.filter(p => ["5", "36", "49"].includes(p.id));

  // Restante dos produtos
  const restantesProdutos = products.filter(p => !["5", "36", "49"].includes(p.id));

  // Produtos das novas seções
  const secao21Products = ["1","2","3","4","5","6","7","8","9","10"];
  const secao22Products = ["72","74","75","76"];

  return (
    <div className="max-w-7xl mx-auto px-8 xl:px-0">
      
      {/* Banner */}
      <div className="mb-4">
        <CarouselBanner products={carouselProducts} />
      </div>

      {/* Seção 21 */}
      <Secao21 productIds={secao21Products} title="" />

      {/* Seção 22 */}
      <Secao22 productIds={secao22Products} title="" />

      {/* Restante dos produtos usando ProductsList */}
      {restantesProdutos.length > 0 && (
        <ProductsList produtos={restantesProdutos} />
      )}

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}
