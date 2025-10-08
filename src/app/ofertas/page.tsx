import React from 'react';

export default function OfertasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ofertas do Dia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder para ofertas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Oferta 1</h2>
          <p className="text-gray-600">Descrição breve da oferta...</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Detalhes</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Oferta 2</h2>
          <p className="text-gray-600">Descrição breve da oferta...</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Detalhes</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Oferta 3</h2>
          <p className="text-gray-600">Descrição breve da oferta...</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Detalhes</button>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">Fique atento para novas ofertas todos os dias!</p>
      </div>
    </div>
  );
}
