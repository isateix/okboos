"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import { useLanguage } from "../../context/LanguageContext"; // 🟢 Importa o contexto de idioma
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const { t } = useLanguage(); // 🟢 Traduções disponíveis

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    if (!formData.email || !formData.senha) {
      setErro(t("login_erro_campos"));
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
        setErro(data.error || t("login_erro_autenticacao"));
        setLoading(false);
        return;
      }

      login(data.user);
      localStorage.setItem("mockAuthToken", JSON.stringify(data.user));

      if (data.user.isAdmin) {
        router.push("/admin/orders");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setErro(t("login_erro_servidor"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6eee9] px-4">
      <div className="w-full max-w-md space-y-6">
        {/* 🧭 Logo / Cabeçalho */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-[#5c3b3b] mb-2">
            Ok<span className="text-orange-600">Boss</span>
          </h1>
          <p className="text-gray-700 mt-2 text-lg">{t("login_bemvindo")}</p>
        </div>

        {/* 📦 Caixa de login */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {t("login_titulo")}
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              placeholder={t("login_email_placeholder")}
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />
            <input
              type="password"
              name="senha"
              placeholder={t("login_senha_placeholder")}
              value={formData.senha}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />

            {erro && <p className="text-red-500 text-sm mb-3 text-center">{erro}</p>}

            <button
              type="submit"
              className="bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition text-lg font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={24} />
              ) : (
                t("login_botao_entrar")
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-700 text-base">
            {t("login_nao_tem_conta")}{" "}
            <Link href="/signup" className="text-orange-600 hover:underline font-medium">
              {t("login_criar_conta")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
