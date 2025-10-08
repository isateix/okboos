// src/components/SuccessModal.tsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm mx-auto">
        <CheckCircle2 className="mx-auto text-orange-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Sucesso!</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
