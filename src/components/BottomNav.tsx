"use client";

import { Home, Grid, Tag, MessageCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden">
      <div className="flex justify-around items-center py-2">
        <button onClick={() => router.push("/")} className="flex flex-col items-center text-gray-700 hover:text-[#0071BC]">
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
        <button onClick={() => router.push("/mensagens")} className="flex flex-col items-center text-gray-700 hover:text-[#0071BC]">
          <MessageCircle size={24} />
          <span className="text-xs">Mensagens</span>
        </button>
        <button onClick={() => router.push("/login")} className="flex flex-col items-center text-gray-700 hover:text-[#0071BC]">
          <User size={24} />
          <span className="text-xs">Perfil</span>
        </button>
      </div>
    </nav>
  );
}
