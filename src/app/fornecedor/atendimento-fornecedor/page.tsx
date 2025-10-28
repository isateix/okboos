"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "../../../components/Footer";

export default function AtendimentoFornecedor() {
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    empresa: "",
    email: "",
    motivo: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/atendimento-fornecedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error("Erro ao enviar mensagem.");

      setStatus("success");
      setFormValues({ empresa: "", email: "", motivo: "", mensagem: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="pt-20 px-6 md:px-16 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
        <section className="flex flex-col md:flex-row items-stretch gap-12 max-w-6xl w-full">
          {/* Formulário */}
          <div className="flex-1 p-8 flex flex-col items-center bg-white/90 backdrop-blur-md rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-[#ff5000] mb-4 text-center">Atendimento ao Fornecedor</h3>
            <p className="text-center text-gray-700 mb-6">
              Precisa de ajuda? Nossa equipe está pronta para atender suas dúvidas e solicitações.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 flex-1">
              <input type="text" name="empresa" placeholder="Nome da empresa" required value={formValues.empresa} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500" />
              <input type="email" name="email" placeholder="E-mail comercial" required value={formValues.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500" />
              <select name="motivo" required value={formValues.motivo} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500">
                <option value="">Motivo do contato</option>
                <option value="duvidas">Dúvidas sobre pedidos</option>
                <option value="pagamento">Pagamentos e faturas</option>
                <option value="entregas">Problemas com entregas</option>
                <option value="suporte">Suporte técnico</option>
                <option value="outro">Outro</option>
              </select>
              <textarea name="mensagem" placeholder="Descreva o problema ou dúvida" required value={formValues.mensagem} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500 flex-1"></textarea>

              <button type="submit" disabled={loading || status === "success"} className="bg-[#ff5000] text-white px-6 py-2 rounded hover:bg-[#e04b00] transition w-auto self-center mt-4">
                {loading ? "Enviando..." : status === "success" ? "Mensagem enviada!" : "Enviar mensagem"}
              </button>
            </form>
          </div>

          <div className="flex-1 flex justify-center">
            <Image src="/images/call.png" alt="Atendimento ao fornecedor" width={400} height={400} className="rounded-lg shadow object-contain" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
