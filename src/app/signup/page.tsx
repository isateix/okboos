"use client";

import { Loader2 } from "lucide-react"; // Import Loader2 icon

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import SuccessModal from "../../components/SuccessModal"; // Import SuccessModal

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for modal visibility
  const [successMessage, setSuccessMessage] = useState(""); // State for modal message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta.");
        setLoading(false);
        return;
      }

      // Sucesso
      setSuccessMessage("Conta criada com sucesso! Faça login para continuar.");
      setShowSuccessModal(true);
      // router.push("/login"); // Redirect after modal closes
    } catch (err) {
      console.error(err);
      setError("Erro no servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage("");
    router.push("/login"); // Redirect after modal closes
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6eee9] px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo / Nome */}
        <div className="text-center">
          <h1 className="text-5xl font-serif font-bold text-[#5c3b3b]">
            Ok <span className="text-[#d9a7a0]">Boss</span>
          </h1>
          <p className="text-gray-600 mt-2">Cria a tua conta</p>
        </div>

        {/* Caixa de Signup */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Criar Conta
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
              disabled={loading}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
              disabled={loading}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
              disabled={loading}
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition text-lg font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={24} />
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Já tens conta?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
}
