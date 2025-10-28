"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";

export default function FornecedorPage() {
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true); // 🔹 Modal aparece ao entrar

  const [formValues, setFormValues] = useState({
    nomeEmpresa: "",
    telefone: "",
    tipoComercial: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/fornecedor-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error("Erro ao enviar mensagem");

      setStatus("success");
      setFormValues({ nomeEmpresa: "", telefone: "", tipoComercial: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔸 Modal de Termos e Condições */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">
              Termos e Condições
            </h2>
            <p className="text-gray-700 mb-6 text-sm">
              Ao continuar, confirma que concorda com o tratamento dos seus dados
              e aceita ser contactado pela nossa equipa para fins comerciais.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-500 transition"
            >
              Concorda e Continuar
            </button>
          </div>
        </div>
      )}

      <main className="pt-12 px-6 md:px-16 flex justify-center items-center min-h-screen bg-gray-50">
        <section className="flex flex-col md:flex-row items-stretch gap-12 max-w-6xl w-full">
          {/* Formulário */}
          <div className="flex-1 p-8 flex flex-col items-center bg-white/80 backdrop-blur-md rounded-lg shadow">
            <h3 className="text-3xl font-bold text-orange-600 mb-4 text-center">
              Cadastre-se como fornecedor(a)
            </h3>
            <p className="text-center text-gray-700 mb-6">
              Preencha o formulário abaixo e entraremos em contacto com você.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4 flex-1"
            >
              <input
                type="text"
                name="nomeEmpresa"
                placeholder="Nome da empresa"
                required
                value={formValues.nomeEmpresa}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
              />

              <div className="flex gap-2">
                <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                  +244
                </span>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Digite seu número de telefone"
                  required
                  value={formValues.telefone}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <select
                name="tipoComercial"
                value={formValues.tipoComercial}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Selecione o tipo comercial (opcional)</option>
                <option value="exportacao">
                  Fazemos negócios de exportação
                </option>
                <option value="ecommerce">
                  Negócio de comércio eletrônico
                </option>
              </select>

              <button
                type="submit"
                disabled={loading || status === "success"}
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-500 transition w-auto self-center mt-4"
              >
                {loading
                  ? "Enviando..."
                  : status === "success"
                  ? "Mensagem enviada!"
                  : "Enviar"}
              </button>

              {status === "error" && (
                <p className="text-red-600 font-semibold mt-4 text-center">
                  Ocorreu um erro ao enviar a mensagem. ❌
                </p>
              )}
            </form>
          </div>

          {/* Imagem */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/fornecedor2.jpg"
              alt="Fornecedor"
              width={400}
              height={400}
              className="rounded-lg shadow object-cover"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
