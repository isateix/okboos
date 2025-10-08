'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from '@prisma/client';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Payment Method</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.guestName || 'Registered User'}</td>
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
      </div>
    </div>
  );
};

export default AdminOrdersPage;
