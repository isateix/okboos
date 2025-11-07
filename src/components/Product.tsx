"use client";

import { Product } from '../types/Product';
import ProductImage from "./ProductImage"; 
import { formatPrice } from "../lib/utils";
import { useCart } from "../context/CartContext";

type ProductProps = {
  product: Product;
};

export default function Product({ product }: ProductProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantidade: 1,
      selectedColor: product.selectedColor || "",
    });
  };

  return (
    <div className="flex flex-col shadow-lg bg-white p-4 text-gray-700 rounded-lg border border-gray-100
      h-80 sm:h-80 md:h-96">

      {/* Imagem ajustada */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <ProductImage product={product} className="object-contain w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
      </div>

      {/* Nome + Preço */}
      <div className="font-semibold my-2 flex justify-between items-center">
        <p className="truncate">{product.name}</p>
        <p className="text-md text-[#0071BC]">{formatPrice(product.price)}</p>
      </div>


      {/* Botão */}
      <button
        onClick={handleAddToCart}
        className="rounded-md bg-[#0071BC] hover:bg-[#005F9D] transition text-white px-3 py-2 text-sm text-center mt-auto"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
