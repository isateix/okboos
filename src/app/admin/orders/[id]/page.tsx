'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Order, OrderItem, Address } from '@prisma/client';

interface OrderDetails extends Order {
  shippingAddress: Address | null;
  items: OrderItem[];
}

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState('');

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        const response = await fetch(`/api/orders/${id}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        }
      };
      fetchOrder();
    }
  }, [id]);

  const handleApproveOrder = async () => {
    // Approve order logic here
  };

  const handleDeliveryDetailsSubmit = async () => {
    // Submit delivery details logic here
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Customer:</strong> {order.guestName || 'Registered User'}</p>
        <p><strong>Email:</strong> {order.guestEmail}</p>
        <p><strong>Phone:</strong> {order.guestPhone}</p>
        <p><strong>Total:</strong> {order.total} AOA</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        {order.shippingAddress && (
          <div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Shipping Address</h2>
            <p>{order.shippingAddress.street}</p>
          </div>
        )}
        <h2 className="text-xl font-semibold mt-4 mb-2">Items</h2>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>{item.name} x {item.quantity} - {item.price * item.quantity} AOA</li>
          ))}
        </ul>
        {order.paymentMethod === 'BANK_TRANSFER' && order.proofOfPayment && (
          <div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Proof of Payment</h2>
            <img src={order.proofOfPayment} alt="Proof of Payment" className="max-w-sm" />
          </div>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Actions</h2>
          {order.status === 'PENDING_APPROVAL' && (
            <button onClick={handleApproveOrder} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Approve Order</button>
          )}
          {order.status === 'PENDING_PAYMENT' && order.paymentMethod === 'BANK_TRANSFER' && (
             <button onClick={handleApproveOrder} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Approve Order</button>
          )}
          <div className="mt-2">
            <textarea value={deliveryDetails} onChange={(e) => setDeliveryDetails(e.target.value)} placeholder="Enter delivery details (date, time, location)" className="w-full p-2 border rounded"></textarea>
            <button onClick={handleDeliveryDetailsSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit Delivery Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
