"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Contacto from '../contacto/page'; // ajuste o caminho
import { useRouter } from 'next/navigation';

const faqs = [
  { question: "Como faço para rastrear meu pedido?", answer: "Você pode rastrear..." },
  { question: "Quais são as opções de pagamento disponíveis?", answer: "Aceitamos..." },
  { question: "Posso devolver um produto se não estiver satisfeito?", answer: "Sim..." },
  { question: "Como entro em contato com o suporte ao cliente?", answer: "Você pode entrar..." },
];

export default function AtendimentoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [role, setRole] = useState<"cliente" | "fornecedor" | null>(null);
  const router = useRouter();

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  const openRoleForm = (selectedRole: "cliente" | "fornecedor") => {
    if (selectedRole === "fornecedor") {
      router.push("/fornecedor");
    } else {
      setRole(selectedRole);
      setShowChoiceModal(false);
    }
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
        <button
          onClick={() => setShowChoiceModal(true)}
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Fale Conosco
        </button>
      </div>

      {/* Modal de escolha de perfil */}
      {showChoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6">Atendimento ao Cliente</h2>
            <p className="mb-4 text-gray-600">Escolha o seu perfil para prosseguir:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openRoleForm("cliente")}
                className="flex flex-col items-center gap-2 bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition"
              >
                <span className="text-2xl">👤</span>
                Cliente
              </button>
              <button
                onClick={() => openRoleForm("fornecedor")}
                className="flex flex-col items-center gap-2 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition"
              >
                <span className="text-2xl">🏭</span>
                Fornecedor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Renderiza Contacto se for cliente */}
      {!showChoiceModal && role === "cliente" && <Contacto />}
    </div>
  );
}
