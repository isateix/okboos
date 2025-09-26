import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  // pega alguns produtos para destaque
  const destaque = products.slice(0, 3);

  return (
    <>
      <Hero imageSrc="/images/home.png" />

      <section className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Produtos em destaque</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destaque.map((produto) => (
            <ProductCard key={produto.id} product={produto} />
          ))}
        </div>
      </section>
    </>
  );
}
