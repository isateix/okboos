import React from 'react';

export default function VenderPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vender na OkBoss</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Torne-se um Vendedor</h2>
        <p className="text-gray-600 mb-4">Junte-se à nossa plataforma e alcance milhares de clientes. É fácil e rápido!</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Começar a Vender</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recursos para Vendedores</h2>
        <p className="text-gray-600 mb-4">Acesse ferramentas e recursos exclusivos para gerenciar seus produtos, pedidos e vendas.</p>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Acessar Painel do Vendedor</button>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">Expanda seus negócios com a OkBoss!</p>
      </div>
    </div>
  );
}
