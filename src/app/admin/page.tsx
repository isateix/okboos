// src/app/admin/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'; // Assuming useUser provides user info including isAdmin
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

interface Order {
  id: number;
  status: string;
  paymentMethod: string;
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  proofOfPayment?: string;
  items: OrderItem[];
  user: UserInfo;
}

const AdminPage = () => {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [newEstimatedDelivery, setNewEstimatedDelivery] = useState<string>('');

  useEffect(() => {
    if (!userLoading && (!user || !user.isAdmin)) {
      router.push('/login'); // Redirect non-admin users
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Erro ao carregar pedidos.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.isAdmin && !userLoading) {
      fetchOrders();
    }
  }, [user, userLoading, router]);

  const handleStatusChange = async (orderId: number) => {
    if (!newStatus) return;

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, estimatedDelivery: newEstimatedDelivery }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );
      setSelectedOrderId(null);
      setNewStatus('');
      setNewEstimatedDelivery('');
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Erro ao atualizar status do pedido.');
    }
  };

  if (loading || userLoading) {
    return <div className="container mx-auto p-4 text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  if (!user?.isAdmin) {
    return <div className="container mx-auto p-4 text-center text-red-500">Acesso negado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo de Pedidos</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pedido #{order.id}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'APPROVED' ? 'bg-green-100 text-green-800' : order.status === 'PENDING_APPROVAL' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                {order.status.replace('_', ' ')}
              </span>
            </div>
<p className="text-gray-600 mb-2">
  Cliente: {order.user?.name ?? "Usuário desconhecido"} ({order.user?.email ?? "sem email"})
</p>
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

            {order.proofOfPayment && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Comprovativo de Pagamento:</h3>
                <a href={order.proofOfPayment} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Ver Comprovativo
                </a>
              </div>
            )}

            <div className="mt-4">
              {selectedOrderId === order.id ? (
                <div className="flex flex-col gap-2">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="p-2 border rounded-md"
                  >
                    <option value="">Selecionar Status</option>
                    <option value="PENDING_PAYMENT">Pendente Pagamento</option>
                    <option value="PENDING_APPROVAL">Pendente Aprovação</option>
                    <option value="APPROVED">Aprovado</option>
                    <option value="SHIPPED">Enviado</option>
                    <option value="DELIVERED">Entregue</option>
                    <option value="CANCELED">Cancelado</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Entrega Estimada (ex: 3-5 dias)"
                    value={newEstimatedDelivery}
                    onChange={(e) => setNewEstimatedDelivery(e.target.value)}
                    className="p-2 border rounded-md"
                  />
                  <button
                    onClick={() => handleStatusChange(order.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setSelectedOrderId(null)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedOrderId(order.id);
                    setNewStatus(order.status);
                    setNewEstimatedDelivery(order.estimatedDelivery || '');
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Atualizar Status
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
