import React from "react";

export default function ContatoPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada!"); // temporário, só para teste
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Fale Conosco</h2>
        <p className="mb-6 text-gray-600 text-center">Estamos aqui para te ajudar!</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            className="p-3 border rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            className="p-3 border rounded"
            required
          />
          <input
            name="telefone"
            type="tel"
            placeholder="Telefone"
            className="p-3 border rounded"
          />
          <input
            name="assunto"
            type="text"
            placeholder="Assunto"
            className="p-3 border rounded"
          />
          <textarea
            name="mensagem"
            placeholder="Mensagem"
            className="p-3 border rounded h-32"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
