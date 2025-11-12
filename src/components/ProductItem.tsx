'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "../types/Product";
import HeartButton from "./HeartButton";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-4 rounded shadow-md bg-white hover:shadow-lg transition cursor-pointer">
      
      {/* Imagem */}
      <div className="relative w-full h-40 sm:h-48 mb-2">
        <Image src={product.image} alt={product.name} fill className="object-contain" />
      </div>

      {/* Nome */}
      <h3 className="text-sm sm:text-base font-medium text-center line-clamp-1">{product.name}</h3>

      {/* Estrelas */}
      <div className="flex gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09L5.6 12.545 1 8.91l6.061-.879L10 2l2.939 6.031L19 8.91l-4.6 3.635 1.478 5.545z" />
          </svg>
        ))}
      </div>

      {/* Preço */}
      <span className="text-sm sm:text-base font-bold mt-2">
        {product.price.toLocaleString("pt-AO")} {product.currency}
      </span>

      {/* Botões */}
      <div className="flex items-center gap-2 mt-2 w-full justify-center">
        {/* Coração */}
        <HeartButton product={product} />

        {/* Ver Mais */}
        <button
          onClick={() => router.push(`/produtos/${product.id}`)}
          className="bg-[#0071BC] text-white px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-[#005fa3] transition"
        >
          Ver Mais
        </button>
      </div>
    </div>
  );
}
