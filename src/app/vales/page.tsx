"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { giftVouchers, GiftVoucher } from '../../data/giftVouchers';

export default function ValesPage() {
  const router = useRouter();

  const handleBuyVoucher = (id: string) => {
    // In a real application, this would navigate to a checkout page for the specific voucher
    router.push(`/checkout?voucherId=${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Presenteie com a Escolha Perfeita</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Surpreenda quem você ama com um Vale-Presente OkBoss, a liberdade de escolher o que realmente deseja.</p>
      </div>

      {/* Seção de Vales-Presente Disponíveis */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nossos Vales-Presente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {giftVouchers.map((voucher: GiftVoucher) => (
          <div
            key={voucher.id}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
            onClick={() => handleBuyVoucher(voucher.id)}
          >
            <div className="relative w-full h-48">
              <Image
                src={voucher.image}
                alt={voucher.theme}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{voucher.theme}</h3>
              <p className="text-xl font-semibold text-blue-600 mb-3">
                {voucher.value.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
              </p>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {voucher.description}
              </p>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-auto"
              >
                Comprar Vale
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de Resgate */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resgatar seu Vale-Presente</h2>
        <p className="text-lg text-gray-600 mb-6 text-center">Já tem um vale-presente? Insira o código abaixo para resgatá-lo e usar em suas compras.</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Insira o código do vale-presente"
            className="flex-1 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
            Resgatar
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">Aproveite a flexibilidade e a conveniência dos nossos vales-presente!</p>
      </div>
    </div>
  );
}