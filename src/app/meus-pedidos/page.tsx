// src/app/meus-pedidos/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  status: string;
  paymentMethod: string;
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  items: OrderItem[];
}

const MeusPedidosPage = () => {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/meus-pedidos');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Erro ao carregar seus pedidos.');
      } finally {
        setLoading(false);
      }
    };

    if (user && !userLoading) {
      fetchOrders();
    }
  }, [user, userLoading, router]);

  if (loading || userLoading) {
    return <div className="container mx-auto p-4 text-center">Carregando pedidos...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="container mx-auto p-4 text-center">Você ainda não fez nenhum pedido.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pedido #{order.id}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'APPROVED' ? 'bg-green-100 text-green-800' : order.status === 'PENDING_APPROVAL' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                {order.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-gray-600 mb-2">Data do Pedido: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">Total: {order.total.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</p>
            {order.estimatedDelivery && (
              <p className="text-gray-600 mb-2">Entrega Estimada: {order.estimatedDelivery}</p>
            )}
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Itens do Pedido:</h3>
              <ul className="list-disc list-inside space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="text-gray-700">
                    {item.name} (x{item.quantity}) - {item.price.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeusPedidosPage;
