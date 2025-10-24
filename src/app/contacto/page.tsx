"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";

export default function Contacto() {
  const { t } = useLanguage();

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
      <main className="pt-12 px-6 md:px-16 flex justify-center items-center min-h-screen">
        <section className="flex flex-col md:flex-row items-stretch gap-12 max-w-6xl w-full">
          {/* Formulário */}
          <div className="flex-1 p-8 flex flex-col items-center bg-white/80 backdrop-blur-md rounded-lg shadow">
            <h3 className="text-3xl font-bold text-orange-600 mb-4 text-center">
              {t("contacto_titulo")}
            </h3>
            <p className="text-center text-gray-700 mb-6">
              {t("contacto_texto")}
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 flex-1">
              <input
                type="text"
                name="nome"
                placeholder={t("contacto_nome_placeholder")}
                required
                value={formValues.nome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                name="email"
                placeholder={t("contacto_email_placeholder")}
                required
                value={formValues.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                name="mensagem"
                placeholder={t("contacto_mensagem_placeholder")}
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
                {loading
                  ? t("contacto_botao_enviando")
                  : status === "success"
                  ? t("contacto_botao_enviado")
                  : t("contacto_botao_enviar")}
              </button>
            </form>
          </div>

          {/* Imagem */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/call.png"
              alt={t("contacto_img_alt")}
              width={400}
              height={400}
              className="rounded-lg shadow object-contain"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
