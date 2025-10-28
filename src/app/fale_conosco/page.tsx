"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AtendimentoPage() {
  const [showChoiceModal, setShowChoiceModal] = useState(true);
  const [role, setRole] = useState<"cliente" | "fornecedor" | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Aqui você pode chamar sua API para enviar email ou salvar no banco
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const success = Math.random() > 0.1;

      if (success) {
        setMessage({ type: "success", text: "Sua mensagem foi enviada com sucesso! Em breve entraremos em contato." });
        setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
      } else {
        throw new Error("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "error", text: "Ocorreu um erro desconhecido." });
      }
    } finally {
      setLoading(false);
    }
  };

  const openRoleForm = (selectedRole: "cliente" | "fornecedor") => {
    if (selectedRole === "fornecedor") {
      router.push("/fornecedor"); // Redireciona para a página de fornecedor
    } else {
      setRole(selectedRole);
      setShowChoiceModal(false); // Continua com o formulário de cliente
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
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

      {/* Formulário Fale Conosco */}
      {!showChoiceModal && role === "cliente" && (
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">Fale Conosco</h2>
          <p className="mb-6 text-gray-600 text-center">
            Estamos aqui para te ajudar! Preencha o formulário abaixo.
          </p>

          {message && (
            <div
              className={`p-4 rounded-lg mb-6 text-center ${
                message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              name="nome"
              type="text"
              placeholder="Seu Nome Completo"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Seu Melhor E-mail"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="telefone"
              type="tel"
              placeholder="Telefone (Opcional)"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.telefone}
              onChange={handleChange}
            />
            <input
              name="assunto"
              type="text"
              placeholder="Assunto da Mensagem"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.assunto}
              onChange={handleChange}
              required
            />
            <textarea
              name="mensagem"
              placeholder="Sua Mensagem"
              className="p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              value={formData.mensagem}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-orange-600 text-white p-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
