"use client";

import { Home, Grid, Tag, MessageCircle, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const router = useRouter();
  const { openAuthModal } = useAuth(); // Contexto do modal

  const [chatOpen, setChatOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden">
        <div className="flex justify-around items-center py-2">
          <button 
            onClick={scrollToTop} 
            className="flex flex-col items-center text-gray-700 hover:text-[#0071BC]"
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => router.push("/categorias")} className="flex flex-col items-center text-gray-700 hover:text-[#0071BC]">
            <Grid size={24} />
            <span className="text-xs">Categorias</span>
          </button>
          <button onClick={() => router.push("/ofertas")} className="flex flex-col items-center text-gray-700 hover:text-[#0071BC]">
            <Tag size={24} />
            <span className="text-xs">Ofertas</span>
          </button>
          <button
            onClick={() => setChatOpen(true)}
            className="flex flex-col items-center text-gray-700 hover:text-[#0071BC]"
          >
            <MessageCircle size={24} />
            <span className="text-xs">Mensagens</span>
          </button>
          <button
            onClick={() => router.push("/login")} // ou openAuthModal() se quiser abrir modal
            className="flex flex-col items-center text-gray-700 hover:text-[#0071BC]"
          >
            <User size={24} />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </nav>

      {/* Modal de Chat */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-sm p-4 rounded-2xl shadow-lg relative">
            {/* Botão de fechar */}
            <button
              onClick={() => setChatOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            {/* Conteúdo do Chat */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0071BC] rounded-full flex items-center justify-center text-white font-bold">
                  B
                </div>
                <div>
                  <p className="font-bold text-[#0071BC]">BUITANDA</p>
                  <p className="text-gray-700 text-sm">
                    Converse conosco
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 text-gray-700 text-sm">
                Olá! Preciso de ajuda? Entre em contato conosco aqui mesmo e
                entraremos em contato com você assim que possível!
              </div>

              {/* Campo de resposta opcional */}
              <input
                type="text"
                placeholder="Escreva sua mensagem..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BC]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
