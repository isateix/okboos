'use client';

import { useParams } from 'next/navigation';
import { products, Product } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';

export default function ProdutoDetailsPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const relatedProducts = products.filter(
    (p) => p.category && p.category === product.category && p.id !== product.id
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</p>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}