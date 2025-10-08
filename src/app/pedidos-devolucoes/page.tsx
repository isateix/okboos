import React from 'react';

export default function PedidosDevolucoesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meus Pedidos e Devoluções</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Meus Pedidos</h2>
        <p className="text-gray-600 mb-4">Acompanhe o status de seus pedidos recentes e visualize seu histórico de compras.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Meus Pedidos</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Solicitar Devolução</h2>
        <p className="text-gray-600 mb-4">Precisa devolver um item? Inicie o processo de devolução aqui.</p>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Iniciar Devolução</button>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">Gerencie suas compras de forma fácil e rápida!</p>
      </div>
    </div>
  );
}
