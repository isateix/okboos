import React from 'react';

export default function ListasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Minhas Listas</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Desejos</h2>
        <p className="text-gray-600">Você ainda não adicionou itens à sua lista de desejos.</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Explorar Produtos</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Listas de Compras</h2>
        <p className="text-gray-600">Crie e gerencie suas listas de compras para facilitar suas futuras compras.</p>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Criar Nova Lista</button>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">Organize seus produtos favoritos e suas compras futuras!</p>
      </div>
    </div>
  );
}
