'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const CheckoutPage = () => {
  const { cart, total } = useCart();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');
  const [proofOfPaymentFile, setProofOfPaymentFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: '', // Add a phone field to your user model if you have one
        address: '', // Add an address field to your user model if you have one
      });
    }
  }, [user]);

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

    if (paymentMethod === 'BANK_TRANSFER' && proofOfPaymentFile) {
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
          return; // Stop the submission if the upload fails
        }
      } catch (error) {
        console.error('Error uploading proof of payment:', error);
        return; // Stop the submission if there is an error
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
        console.log('Order created:', order);
        // Redirect to order confirmation page or show success message
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" value="BANK_TRANSFER" checked={paymentMethod === 'BANK_TRANSFER'} onChange={handlePaymentMethodChange} className="mr-2" />
                Bank Transfer
              </label>
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" value="CASH_ON_DELIVERY" checked={paymentMethod === 'CASH_ON_DELIVERY'} onChange={handlePaymentMethodChange} className="mr-2" />
                Cash on Delivery
              </label>
            </div>
            {paymentMethod === 'BANK_TRANSFER' && (
              <div className="mt-4">
                <label htmlFor="proofOfPayment" className="block text-sm font-medium text-gray-700">Proof of Payment</label>
                <input type="file" id="proofOfPayment" name="proofOfPayment" onChange={(e) => setProofOfPaymentFile(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
              </div>
            )}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
              <div className="flex flex-col gap-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantidade}</span>
                    <span>{item.price * item.quantidade} AOA</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>{total} AOA</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Place Order</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;