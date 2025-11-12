"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";

export default function Contacto() {
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error("Erro ao enviar mensagem");

      setStatus("success");
      setFormValues({ nome: "", email: "", mensagem: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="pt-12 px-6 md:px-16 flex justify-center items-start min-h-screen">
        <div className="flex flex-col md:flex-row items-start gap-12 max-w-7xl w-full">

          {/* Formulário à esquerda */}
          <div className="flex-1 p-6 flex flex-col bg-white/80 backdrop-blur-md rounded-lg shadow">
            <h3 className="text-2xl font-bold text-orange-600 mb-4 text-center">
              Contacte-nos
            </h3>
            <p className="text-center text-gray-700 mb-4">
              Preencha o formulário abaixo e entraremos em contacto consigo.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                required
                value={formValues.nome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                required
                value={formValues.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                name="mensagem"
                placeholder="Sua mensagem"
                required
                value={formValues.mensagem}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
              ></textarea>

              <button
                type="submit"
                disabled={loading || status === "success"}
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-500 transition mt-3"
              >
                {loading
                  ? "Enviando..."
                  : status === "success"
                  ? "Enviado!"
                  : "Enviar"}
              </button>
            </form>
          </div>

          {/* Imagem à direita */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/call.png"
              alt="Imagem de contacto"
              width={300}
              height={300}
              className="rounded-lg shadow object-contain"
            />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
