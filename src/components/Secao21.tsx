'use client';

import Image from "next/image";
import { products } from "../data/products";
import { useRouter } from "next/navigation";

interface SecaoProps {
  productIds: string[];
  title?: string;
}

export default function Secao21({ productIds, title }: SecaoProps) {
  const router = useRouter();
  const produtos = products.filter(p => productIds.includes(p.id));

  return (
    <div className="mb-8">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {produtos.map((produto) => (
          <div 
            key={produto.id} 
            className="flex flex-col items-center p-4 rounded shadow-md bg-gray-200 hover:bg-gray-400 transition duration-300 cursor-pointer"
          >
            {/* Imagem */}
            <div className="relative w-full h-40 sm:h-48">
              <Image src={produto.image} alt={produto.name} fill className="object-contain" />
            </div>

            {/* Nome */}
            <h3 className="text-sm sm:text-base font-medium text-center mt-3 line-clamp-1">{produto.name}</h3>

            {/* 5 Estrelas */}
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09L5.6 12.545 1 8.91l6.061-.879L10 2l2.939 6.031L19 8.91l-4.6 3.635 1.478 5.545z" />
                </svg>
              ))}
            </div>

            {/* Preço */}
            <span className="text-sm sm:text-base font-bold mt-2">
              {produto.price.toLocaleString("pt-AO")} {produto.currency}
            </span>

            {/* Botão Ver Mais */}
            <button
              onClick={() => router.push(`/produtos/${produto.id}`)}
              className="mt-2 bg-white text-blue-900 text-xs sm:text-sm px-4 py-2 rounded-md shadow-sm hover:bg-blue-50 transition"
            >
              Ver Mais
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
