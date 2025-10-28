"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  const { t } = useLanguage(); // 🟢 acesso às traduções

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm mx-auto">
        <CheckCircle2 className="mx-auto text-orange-500 mb-4" size={48} />

        {/* 🟠 Título traduzido */}
        <h2 className="text-2xl font-bold text-orange-500 mb-4">
          {t("modal_sucesso_titulo")}
        </h2>

        {/* 💬 Mensagem dinâmica (traduzida no componente pai) */}
        <p className="text-gray-700 mb-6">{message}</p>

        {/* 🔘 Botão traduzido */}
        <button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t("modal_fechar")}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
