import { products, Product } from "../../data/products";
import ProductCard from "../../components/ProductCard";
interface Props {
  searchParams?: { search?: string };
}

export default function ProdutosPage({ searchParams }: Props) {
  const search = searchParams?.search?.toLowerCase() || "";

  const filtered: Product[] = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search) ||
      (p.description?.toLowerCase().includes(search) ?? false)
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      {filtered.length === 0 ? (
        <p>Nenhum produto encontrado para "{search}"</p>
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
