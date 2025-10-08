import { products, Product } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import { slugify } from "../../lib/utils/slugify";

interface Props {
  searchParams?: { search?: string; category?: string };
}

export default function ProdutosPage({ searchParams }: Props) {
  const search = searchParams?.search?.toLowerCase() || "";
  let category = searchParams?.category?.toLowerCase() || "";

  if (category === 'undefined') {
    category = '';
  }

  const filtered: Product[] = products.filter((p) => {
    if (category) {
      return p.category ? slugify(p.category) === category : false;
    }
    if (search) {
      return (
        p.name.toLowerCase().includes(search) ||
        (p.description?.toLowerCase().includes(search) ?? false)
      );
    }
    return true;
  });

  const pageTitle = category
    ? products.find((p) => p.category && slugify(p.category) === category)?.category
    : "Produtos";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{pageTitle || 'Produtos'}</h1>
      {filtered.length === 0 ? (
        <p>Nenhum produto encontrado {category ? `na categoria "${pageTitle}"` : search ? `para "${search}"` : ''}.</p>
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
