"use client";

import ProductCard from "./ProductCard";
import { Product } from "../data/products";

interface Props {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
