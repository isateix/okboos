"use client";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6eee9] px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo / Nome */}
        <div className="text-center">
          <h1 className="text-5xl font-serif font-bold text-[#5c3b3b]">
            Ok <span className="text-[#d9a7a0]">Boss</span>
          </h1>
          <p className="text-gray-600 mt-2">Bem-vindo de volta</p>
        </div>

        {/* Caixa de Login */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Entrar
          </h2>

          <form className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg px-4 py-3 text-lg"
            />
            <input
              type="password"
              placeholder="Senha"
              className="border rounded-lg px-4 py-3 text-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Não tens conta?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Criar conta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
