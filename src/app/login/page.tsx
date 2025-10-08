"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // Import Loader2 icon

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(""); // Clear previous errors
    setLoading(true); // Set loading to true

    if (!formData.email || !formData.senha) {
      setErro("Preencha todos os campos!");
      setLoading(false);
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
        setLoading(false);
        return;
      }

      login(data.user);
      localStorage.setItem('mockAuthToken', JSON.stringify(data.user)); // Store token
      if (data.user.isAdmin) {
        router.push("/admin/orders"); // Redirect admin to admin orders page
      } else {
        router.push("/"); // Redirect regular user to home page
      }
    } catch (err) {
      console.error(err);
      setErro("Erro no servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
            Ok<span className="text-blue-600">Boss</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Bem-vindo de volta!</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Entrar na sua conta
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            {erro && <p className="text-red-500 text-sm mb-3 text-center">{erro}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={24} />
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-base">
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline font-medium">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
