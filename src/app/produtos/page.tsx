import { products, Product } from "../../data/products";
import ProductCard from "../../components/ProductCard";
interface Props {
  searchParams?: { search?: string; category?: string };
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export default function ProdutosPage({ searchParams }: Props) {
  const search = searchParams?.search?.toLowerCase() || "";
  const category = searchParams?.category?.toLowerCase() || "";

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
