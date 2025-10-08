"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Como faço para rastrear meu pedido?",
    answer: "Você pode rastrear seu pedido acessando a seção 'Meus Pedidos' em sua conta. Lá, você encontrará o status atual e um link para o rastreamento detalhado.",
  },
  {
    question: "Quais são as opções de pagamento disponíveis?",
    answer: "Aceitamos diversas formas de pagamento, incluindo cartões de crédito (Visa, MasterCard, American Express), PayPal e transferência bancária. Você pode ver todas as opções no checkout.",
  },
  {
    question: "Posso devolver um produto se não estiver satisfeito?",
    answer: "Sim, aceitamos devoluções dentro de 30 dias após o recebimento do produto, desde que esteja em sua condição original. Consulte nossa política de devolução para mais detalhes.",
  },
  {
    question: "Como entro em contato com o suporte ao cliente?",
    answer: "Você pode entrar em contato conosco através do nosso formulário 'Fale Conosco', por e-mail em suporte@okboss.com, ou pelo telefone +244 947 965 623 durante o horário comercial.",
  },
];

export default function AtendimentoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">Central de Ajuda</h1>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Perguntas Frequentes</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b last:border-b-0">
              <button
                className="flex justify-between items-center w-full p-6 text-left font-semibold text-lg text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <ChevronDown
                  className={`transform transition-transform duration-200 ${openFaq === index ? 'rotate-180' : 'rotate-0'}`}
                  size={24}
                />
              </button>
              {openFaq === index && (
                <div className="p-6 pt-0 text-gray-700 leading-relaxed animate-fadeIn">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ainda Precisa de Ajuda?</h2>
        <p className="text-lg text-gray-600 mb-6">Se você não encontrou a resposta que procurava, nossa equipe está pronta para ajudar.</p>
        <a
          href="/fale_conosco"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Fale Conosco
        </a>
      </div>
    </div>
  );
}