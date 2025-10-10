"use client";

import { useState } from "react";
import Image from "next/image";

export default function Contacto() {
  const [status, setStatus] = useState<null | "success">(null);
  const [loading, setLoading] = useState(false);

  // ✅ Valores do formulário controlados
  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("nome", formValues.nome);
    formData.append("email", formValues.email);
    formData.append("mensagem", formValues.mensagem);

    try {
      await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      // ✅ Email enviado, mostra "Enviado" e limpa visualmente os campos
      setStatus("success");
      setFormValues({ nome: "", email: "", mensagem: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="w-full bg-[#232f3e] text-white px-6 md:px-16 py-3 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <span className="text-2xl font-bold text-orange-600">OkBoss</span>
          <span className="text-sm text-gray-300">Comércio e Serviços</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="/" className="hover:text-orange-500 transition">Início</a>
          <a href="/produtos" className="hover:text-orange-500 transition">Produtos</a>
          <a href="/quem-somos" className="hover:text-orange-500 transition">Quem Somos</a>
          <a href="/contacto" className="hover:text-orange-500 transition font-semibold text-orange-500">Contacto</a>
        </div>
      </nav>

      <main className="pt-12 px-6 md:px-16 flex justify-center items-center min-h-screen">
  <section className="flex flex-col md:flex-row items-stretch gap-12 max-w-6xl w-full">
    
    {/* Formulário */}
    <div className="flex-1 p-8 flex flex-col items-center bg-white/80 backdrop-blur-md rounded-lg shadow">
      <h3 className="text-3xl font-bold text-orange-600 mb-4 text-center">
        Pergunta-me alguma coisa!
      </h3>
      <p className="text-center text-gray-700 mb-6">
        Tens dúvidas ou sugestões? Preenche o formulário abaixo que entraremos em contacto contigo.
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 flex-1">
        <input
          type="text"
          name="nome"
          placeholder="O seu nome"
          required
          value={formValues.nome}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          name="email"
          placeholder="O seu email"
          required
          value={formValues.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          name="mensagem"
          placeholder="Escreva a sua mensagem..."
          required
          value={formValues.mensagem}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500 flex-1"
        ></textarea>

        <button
          type="submit"
          disabled={loading || status === "success"}
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-500 transition w-auto self-center mt-4"
        >
          {loading ? "Enviando..." : status === "success" ? "Enviado" : "Enviar"}
        </button>
      </form>
    </div>

    {/* Imagem */}
    <div className="flex-1 flex justify-center">
      <Image
        src="/images/entrega.png"
        alt="Imagem de contacto"
        width={400}
        height={400}
        className="rounded-lg shadow object-contain"
      />
    </div>
  </section>
</main>
    </>
  );
}
