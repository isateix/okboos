"use client";

import { products, Product } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import { slugify } from "../../lib/utils/slugify";

interface Props {
  searchParams?: { search?: string; category?: string };
}

export default function ProdutosPageClient({ searchParams = {} }: Props) {
  const search = searchParams.search?.toLowerCase() || "";
  const category = searchParams.category?.toLowerCase() || "";

  const filtered: Product[] = products.filter((p) => {
    const matchesCategory = !category || slugify(p.category) === category;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search) ||
      (p.description?.toLowerCase().includes(search) ?? false);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      {filtered.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((produto) => (
            <ProductCard key={produto.id} product={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
