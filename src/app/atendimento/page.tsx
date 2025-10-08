import React from 'react';

export default function AtendimentoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Atendimento ao Cliente</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Perguntas Frequentes</h2>
        <p className="text-gray-600 mb-4">Encontre respostas para as perguntas mais comuns sobre nossos produtos e serviços.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver FAQ</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Fale Conosco</h2>
        <p className="text-gray-600 mb-4">Precisa de ajuda personalizada? Entre em contato com nossa equipe de suporte.</p>
        <ul className="text-gray-700 space-y-2">
          <li>Email: suporte@okboss.com</li>
          <li>Telefone: +244 947 965 623</li>
          <li>Horário de Atendimento: Seg-Sex, 9h-18h</li>
        </ul>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Enviar Mensagem</button>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">Estamos aqui para ajudar!</p>
      </div>
    </div>
  );
}
