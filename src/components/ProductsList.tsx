'use client';

import { Product } from "../types/Product";
import ProductItem from "./ProductItem";

interface ProductsListProps {
  produtos: Product[];
}

export default function ProductsList({ produtos }: ProductsListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
      {produtos.map((produto) => (
        <ProductItem key={produto.id} product={produto} />
      ))}
    </div>
  );
}
