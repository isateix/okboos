import React from 'react';
import { products, Product } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import { slugify } from '../../lib/utils/slugify';

export default function OfertasPage() {
  const dailyDeals: Product[] = products.filter(
    (product) =>
      product.category === 'Ofertas do Dia' &&
      product.originalPrice &&
      product.discountPercentage &&
      product.discountPercentage > 0
  );

  // Optionally, pick a featured deal
  const featuredDeal = dailyDeals.length > 0 ? dailyDeals[0] : null;
  const otherDeals = dailyDeals.slice(featuredDeal ? 1 : 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Ofertas do Dia</h1>

      {dailyDeals.length === 0 ? (
        <p className="text-center text-xl text-gray-600">Nenhuma oferta especial encontrada hoje. Volte amanhã!</p>
      ) : (
        <>
          {featuredDeal && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between animate-fadeIn">
              <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-5xl font-bold mb-4 leading-tight">Oferta Destacada!</h2>
                <h3 className="text-3xl font-semibold mb-2">{featuredDeal.name}</h3>
                <p className="text-lg mb-4">De: <span className="line-through">{featuredDeal.originalPrice?.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span></p>
                <p className="text-4xl font-bold">Por: {featuredDeal.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</p>
                <p className="text-xl font-semibold mt-2">Economize {featuredDeal.discountPercentage}%!</p>
                <a
                  href={`/produtos/${featuredDeal.id}`}
                  className="mt-6 inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
                >
                  Ver Oferta
                </a>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={featuredDeal.image}
                  alt={featuredDeal.name}
                  className="max-w-full h-auto rounded-lg shadow-lg md:max-w-sm"
                />
              </div>
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Outras Ofertas Incríveis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherDeals.map((produto) => (
              <ProductCard key={produto.id} product={produto} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}