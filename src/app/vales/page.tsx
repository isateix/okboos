import React from 'react';

export default function ValesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vales-Presente</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Comprar um Vale-Presente</h2>
        <p className="text-gray-600 mb-4">Surpreenda alguém especial com a liberdade de escolher o que quiser na OkBoss.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Comprar Agora</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resgatar um Vale-Presente</h2>
        <p className="text-gray-600 mb-4">Já tem um vale-presente? Resgate-o aqui para usar em suas compras.</p>
        <input type="text" placeholder="Insira o código do vale-presente" className="w-full border border-gray-300 rounded py-2 px-3 mb-4" />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Resgatar</button>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">Aproveite a flexibilidade e a conveniência dos nossos vales-presente!</p>
      </div>
    </div>
  );
}
