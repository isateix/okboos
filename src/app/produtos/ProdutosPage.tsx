"use client";

import { useRouter } from "next/navigation";
import { products, ProductType } from "../../data/products";
import Product from "../../components/Product";

interface Props {
  searchParams?: { search?: string; category?: string | string[] };
}

export default function ProdutosPage({ searchParams = {} }: Props) {
  const router = useRouter();
  const search = searchParams.search?.toLowerCase() || "";
  const categoryValue = searchParams.category;

  
  // Normaliza categoria (array ou string)
  let categoryParams = "";
  if (Array.isArray(categoryValue)) {
    categoryParams = categoryValue[0] || "";
  } else if (typeof categoryValue === "string") {
    categoryParams = categoryValue;
  }

  const selectedCategories = categoryParams
    ? categoryParams.split(",").map((c) => c.trim().toLowerCase())
    : [];

  // 🔹 Função para normalizar strings (remove acentos e converte para minúsculas)
  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // 🔹 Filtro de produtos
  const filtered: ProductType[] = products.filter((p) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(normalize(p.category || ""));

    const matchesSearch = search
      ? normalize(p.name).includes(normalize(search)) ||
        (p.description ? normalize(p.description).includes(normalize(search)) : false)
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {selectedCategories.length > 0 ? selectedCategories.join(", ") : "Produtos"}
      </h1>

      {filtered.length === 0 ? (
        <p>Nenhum produto encontrado{search ? ` para "${search}"` : ""}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((produto) => (
  <Product key={produto.id} product={produto} />
))}
        </div>
      )}
    </div>
  );
}
