"use client";

import { useRouter } from "next/navigation";
import { products } from '../data/products';
import Product from '../components/Product';
import Secao17 from '../components/Secao17';

export default function Home() {
  const router = useRouter();

  const primeirosProdutos = products.slice(0, 8);
  const restantesProdutos = products.slice(8);

  return (
    <div className="max-w-7xl mx-auto pt-4 px-8 xl:px-0">

      {/* Banner */}
      <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden mx-auto w-3/4 h-72 sm:h-64 md:h-72 relative flex items-center justify-center">

        {/* Texto desktop */}
        <div className="hidden sm:flex absolute left-4 md:left-8 max-w-xs z-10 flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0071BC] leading-tight">
            Promoção Especial!
          </h2>
          <p className="mt-1 text-lg sm:text-xl text-gray-800">
            Entrega grátis em pedidos acima de 5 caixas
          </p>
          <button
            onClick={() => router.push("/produtos")}
            className="mt-3 px-4 py-2 bg-[#0071BC] text-white rounded-lg hover:bg-[#005F9D] transition"
          >
            Aproveitar Agora
          </button>
        </div>

        {/* Texto mobile */}
        <div className="flex flex-col sm:hidden items-center justify-between absolute inset-0 z-10">
          <h2 className="text-2xl font-bold text-[#0071BC] mt-4">
            Promoção Especial!
          </h2>
          <button
            onClick={() => router.push("/produtos")}
            className="mb-4 px-4 py-2 bg-[#0071BC] text-white rounded-lg hover:bg-[#005F9D] transition"
          >
            Aproveitar Agora
          </button>
        </div>

        {/* Imagem */}
        <img
          src="/images/banner.png"
          alt="Promoções"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 h-72 sm:h-80 md:h-88 w-auto object-contain"
        />
      </div>

      {/* Primeiros 8 produtos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {primeirosProdutos.map((prod) => (
          <Product key={prod.id} product={prod} />
        ))}
      </div>

      {/* Seção 17 */}
      <Secao17 />

      {/* Restantes produtos */}
      {restantesProdutos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
          {restantesProdutos.map((prod) => (
            <Product key={prod.id} product={prod} />
          ))}
        </div>
      )}

    </div>
  );
}
