"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

export default function AuthModal() {
  const { showAuthModal, closeAuthModal } = useAuth();
  const { login } = useUser();

  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erro, setErro] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro ao logar");
        return;
      }

      login({ nome: data.user.name });
      closeAuthModal();
    } catch (err) {
      console.error(err);
      setErro("Erro no servidor");
    }
  };

  const handleRegister = async () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setErro("Preencha todos os campos!");
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro ao registrar");
        return;
      }

      login({ nome: data.user.name });
      closeAuthModal();
    } catch (err) {
      console.error(err);
      setErro("Erro no servidor");
    }
  };

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="relative bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={closeAuthModal}
        >
          ×
        </button>

        {!isRegistering ? (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center">Entrar no OkBoss</h2>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
            />
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
            />
            {erro && <p className="text-red-500 text-sm mb-3 text-center">{erro}</p>}
            <button onClick={handleLogin} className="w-full bg-black text-white py-2 rounded">
              Entrar →
            </button>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Não tem uma conta?{" "}
              <span className="text-orange-600 cursor-pointer" onClick={() => setIsRegistering(true)}>
                Cadastre-se
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center">Criar conta OkBoss</h2>
            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
            />
            <input
              type="password"
              name="senha"
              placeholder="Crie uma senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
            />
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
            />
            {erro && <p className="text-red-500 text-sm mb-3 text-center">{erro}</p>}
            <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-2 rounded">
              Cadastrar
            </button>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Já tem conta?{" "}
              <span className="text-orange-600 cursor-pointer" onClick={() => setIsRegistering(false)}>
                Entrar
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
