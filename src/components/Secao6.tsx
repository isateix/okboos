"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Secao6() {
  const router = useRouter();

  return (
    <section className="relative w-full py-28 px-6 md:px-16 overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <img
          src="/images/telefonar.png"
          alt="Fundo de atendimento"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Degradê escuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a2f1f]/85 via-[#5c3a27]/80 to-[#6e4931]/75"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center text-white max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          Tudo pronto para começar?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl"
        >
          Crie sua conta hoje para explorar milhões de produtos de fornecedores de confiança!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/signup")} // 👈 redireciona
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300"
        >
          Cadastrar
        </motion.button>
      </div>
    </section>
  );
}
