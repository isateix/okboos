'use client';

import Image from "next/image";
import { products } from "../data/products";
import { useRouter } from "next/navigation";

interface SecaoProps {
  productIds: string[];
  title?: string;
}

export default function Secao22({ productIds, title }: SecaoProps) {
  const router = useRouter();
  const produtos = products.filter(p => productIds.includes(p.id));

  return (
    <div className="mb-8">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {produtos.map((produto) => (
          <div 
            key={produto.id} 
            className="flex flex-row items-center p-2 rounded-xl shadow hover:shadow-lg transition bg-transparent h-[100px]"
          >
            {/* Imagem à esquerda */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
              <Image src={produto.image} alt={produto.name} fill className="object-contain" />
            </div>

            {/* Conteúdo à direita */}
            <div className="flex flex-col justify-between ml-2 flex-1 h-full">
              <h3 className="text-xs sm:text-sm font-medium text-blue-900 line-clamp-1">{produto.name}</h3>
              <span className="text-xs font-bold mt-1">
                {produto.price.toLocaleString("pt-AO")} {produto.currency}
              </span>
              <button
                onClick={() => router.push(`/produtos/${produto.id}`)}
                className="mt-1 bg-white text-blue-900 text-xs px-2 py-1 rounded-md shadow-sm hover:bg-blue-50 transition w-max"
              >
                Ver Mais
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
