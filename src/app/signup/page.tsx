"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import SuccessModal from "../../components/SuccessModal";
import { useLanguage } from "../../context/LanguageContext";

export default function SignupPage() {
  const router = useRouter();
  const { t } = useLanguage(); // 🟢 Usa o contexto de linguagem

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔄 Atualiza campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(t("signup_error_campos"));
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("signup_error_senhas"));
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
        setError(data.error || t("signup_error_criar"));
        setLoading(false);
        return;
      }

      // 🟢 Sucesso
      setSuccessMessage(t("signup_sucesso"));
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setError(t("signup_error_servidor"));
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage("");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6eee9] px-4">
      <div className="w-full max-w-md space-y-6">
        {/* 🔸 Logo */}
        <div className="text-center">
          <h1 className="text-5xl font-serif font-bold text-[#5c3b3b]">
            Ok <span className="text-[#d9a7a0]">Boss</span>
          </h1>
          <p className="text-gray-600 mt-2">{t("signup_subtitulo")}</p>
        </div>

        {/* 🔸 Caixa de cadastro */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {t("signup_titulo")}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder={t("signup_nome")}
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              placeholder={t("signup_email")}
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
              disabled={loading}
            />
            <input
              type="password"
              name="password"
              placeholder={t("signup_senha")}
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
              disabled={loading}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder={t("signup_confirmar_senha")}
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
                t("signup_botao")
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            {t("signup_ja_tem_conta")}{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              {t("signup_entrar")}
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
