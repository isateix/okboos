// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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

      login(data.user);
      localStorage.setItem('mockAuthToken', JSON.stringify(data.user)); // Store token
      router.push("/"); // Redirect to home or previous page
    } catch (err) {
      console.error(err);
      setErro("Erro no servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6eee9] px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-5xl font-serif font-bold text-[#5c3b3b]">
            Ok <span className="text-[#d9a7a0]">Boss</span>
          </h1>
          <p className="text-gray-600 mt-2">Bem-vindo de volta</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Entrar
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-lg"
            />
            {erro && <p className="text-red-500 text-sm mb-3 text-center">{erro}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Não tens conta?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
