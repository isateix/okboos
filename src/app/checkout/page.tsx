"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { useRouter } from 'next/navigation';
import SuccessModal from '../../components/SuccessModal';

const IBAN = "AO06.0006.0000.0000.0000.0000.000"; // Hardcoded IBAN

const CheckoutPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { cart, total, clearCart } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');
  const [proofOfPaymentFile, setProofOfPaymentFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/carrinho'); // Redirect to cart if not logged in
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: '', // Assuming phone and address are not in user model yet
        address: '',
      });
    }
  }, [user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let proofOfPaymentPath: string | undefined;

    if (paymentMethod === 'BANK_TRANSFER') {
      if (!proofOfPaymentFile) {
        alert('Por favor, envie o comprovativo de pagamento.');
        return;
      }

      const formData = new FormData();
      formData.append('file', proofOfPaymentFile);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const { filePath } = await response.json();
          proofOfPaymentPath = filePath;
        } else {
          console.error('Failed to upload proof of payment');
          alert('Falha ao enviar o comprovativo de pagamento.');
          return;
        }
      } catch (error) {
        console.error('Error uploading proof of payment:', error);
        alert('Erro ao enviar o comprovativo de pagamento.');
        return;
      }
    }

    const orderData = {
      ...formData,
      paymentMethod,
      cart,
      total,
      userId: user?.id,
      proofOfPayment: proofOfPaymentPath,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        setShowSuccessModal(true);
        clearCart();
      } else {
        console.error('Failed to create order');
        alert('Falha ao finalizar o pedido.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erro ao finalizar o pedido.');
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push('/meus-pedidos');
  };

  if (!user) {
    return null; // Or a loading spinner, as redirect happens in useEffect
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Informações de Envio</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de Telefone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço de Entrega</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Método de Pagamento</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" value="BANK_TRANSFER" checked={paymentMethod === 'BANK_TRANSFER'} onChange={handlePaymentMethodChange} className="mr-2" />
                Transferência Bancária
              </label>
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" value="CASH_ON_DELIVERY" checked={paymentMethod === 'CASH_ON_DELIVERY'} onChange={handlePaymentMethodChange} className="mr-2" />
                Pagamento na Entrega
              </label>
            </div>

            {paymentMethod === 'BANK_TRANSFER' && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <p className="font-semibold mb-2">Detalhes para Transferência:</p>
                <p><strong>Banco:</strong> Exemplo Banco</p>
                <p><strong>IBAN:</strong> {IBAN}</p>
                <p className="text-sm text-gray-600 mt-2">Por favor, faça a transferência para o IBAN acima e envie o comprovativo abaixo.</p>
                <div className="mt-4">
                  <label htmlFor="proofOfPayment" className="block text-sm font-medium text-gray-700">Comprovativo de Pagamento</label>
                  <input type="file" id="proofOfPayment" name="proofOfPayment" onChange={(e) => setProofOfPaymentFile(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required={paymentMethod === 'BANK_TRANSFER'} />
                </div>
              </div>
            )}

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Resumo do Pedido</h2>
              <div className="flex flex-col gap-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantidade}</span>
                    <span>{item.price * item.quantidade} AOA</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>{total.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Finalizar Pedido</button>
            </div>
          </div>
        </div>
      </form>

      {showSuccessModal && (
        <SuccessModal
          message="Seu pedido foi enviado com sucesso e receberá a aprovação!"
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
};
export default CheckoutPage;
