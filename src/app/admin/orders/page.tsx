'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from '@prisma/client';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('PENDING_APPROVAL,PENDING_PAYMENT'); // Default filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const mockAuthToken = localStorage.getItem('mockAuthToken');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (mockAuthToken) {
          headers['Authorization'] = `Bearer ${mockAuthToken}`;
        }

        console.log("AdminOrdersPage: Sending Authorization header:", headers['Authorization']);

        const response = await fetch(`/api/admin/orders?status=${filterStatus}`, {
          headers: headers,
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch admin orders:', response.status, errorData);
          setError(errorData.message || 'Falha ao buscar pedidos de administrador.');
        }
      } catch (err: any) {
        console.error('Error fetching admin orders:', err);
        setError('Erro ao conectar com o servidor. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [filterStatus]);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando pedidos...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Pedidos</h1>

      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filtrar por Status:</label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos</option>
          <option value="PENDING_APPROVAL,PENDING_PAYMENT">Pendentes de Aprovação/Pagamento</option>
          <option value="APPROVED">Aprovados</option>
          <option value="SHIPPED">Enviados</option>
          <option value="DELIVERED">Entregues</option>
          <option value="CANCELLED">Cancelados</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        {orders.length === 0 ? (
          <p className="text-center">Nenhum pedido encontrado com o status selecionado.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID do Pedido</th>
                <th className="py-2 px-4 border-b">Cliente</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Método de Pagamento</th>
                <th className="py-2 px-4 border-b">Data</th>
                <th className="py-2 px-4 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.user?.name || order.guestName || 'Usuário Convidado'}</td>
                  <td className="py-2 px-4 border-b">{order.total} AOA</td>
                  <td className="py-2 px-4 border-b">{order.status}</td>
                  <td className="py-2 px-4 border-b">{order.paymentMethod}</td>
                  <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">
                    <Link href={`/admin/orders/${order.id}`} className="text-blue-500 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
