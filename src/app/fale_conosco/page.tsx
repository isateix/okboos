"use client";

import React, { useState } from "react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // Simulate success or failure
      const success = Math.random() > 0.1; // 90% success rate

      if (success) {
        setMessage({ type: 'success', text: 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.' });
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          assunto: "",
          mensagem: "",
        });
      } else {
        throw new Error('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Ocorreu um erro desconhecido.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">Fale Conosco</h2>
        <p className="mb-8 text-gray-600 text-center">Estamos aqui para te ajudar! Preencha o formulário abaixo e entraremos em contato.</p>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 text-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {message.text}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            name="nome"
            type="text"
            placeholder="Seu Nome Completo"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Seu Melhor E-mail"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="telefone"
            type="tel"
            placeholder="Telefone (Opcional)"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.telefone}
            onChange={handleChange}
          />
          <input
            name="assunto"
            type="text"
            placeholder="Assunto da Mensagem"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.assunto}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensagem"
            placeholder="Sua Mensagem"
            className="p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={formData.mensagem}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </form>
      </div>
    </div>
  );
}