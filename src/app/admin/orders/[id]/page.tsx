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
  console.log("Client-side Order ID from useParams:", id);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        const mockAuthToken = localStorage.getItem('mockAuthToken');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (mockAuthToken) {
          headers['Authorization'] = `Bearer ${mockAuthToken}`;
        }

        console.log("AdminOrderDetailsPage: Sending Authorization header:", headers['Authorization']);

        const response = await fetch(`/api/admin/orders/${id}`, {
          headers: headers,
        });
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
          if (data.estimatedDelivery) {
            setDeliveryDetails(data.estimatedDelivery);
          }
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch order details:', response.status, errorData);
          setMessage({ type: 'error', text: errorData.message || 'Failed to fetch order details.' });
        }
      };
      fetchOrder();
    }
  }, [id]);

  const handleApproveOrder = async () => {
    if (!order) return;
    try {
      const mockAuthToken = localStorage.getItem('mockAuthToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (mockAuthToken) {
        headers['Authorization'] = `Bearer ${mockAuthToken}`;
      }

      console.log("AdminOrderDetailsPage: Approving with Authorization header:", headers['Authorization']);

      const response = await fetch(`/api/admin/orders/${id}/approve`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ deliveryDetails }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
        setMessage({ type: 'success', text: 'Order approved successfully!' });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || 'Failed to approve order.' });
      }
    } catch (error) {
      console.error('Error approving order:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    }
  };

  const handleDeliveryDetailsSubmit = async () => {
    if (!order) return;
    try {
      const mockAuthToken = localStorage.getItem('mockAuthToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (mockAuthToken) {
        headers['Authorization'] = `Bearer ${mockAuthToken}`;
      }

      console.log("AdminOrderDetailsPage: Submitting delivery details with Authorization header:", headers['Authorization']);

      const response = await fetch(`/api/admin/orders/${id}/delivery`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ estimatedDelivery: deliveryDetails }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
        setMessage({ type: 'success', text: 'Delivery details updated successfully!' });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || 'Failed to update delivery details.' });
      }
    } catch (error) {
      console.error('Error updating delivery details:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {message && (
        <div className={`p-3 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
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
          {order.status === 'PENDING_APPROVAL' || (order.status === 'PENDING_PAYMENT' && order.paymentMethod === 'BANK_TRANSFER') ? (
            <button onClick={handleApproveOrder} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Approve Order</button>
          ) : (
            <p className="text-gray-600">Order is {order.status}. No approval needed.</p>
          )}
          <div className="mt-2">
            <textarea value={deliveryDetails} onChange={(e) => setDeliveryDetails(e.target.value)} placeholder="Enter estimated delivery details (e.g., '2-3 business days')" className="w-full p-2 border rounded"></textarea>
            <button onClick={handleDeliveryDetailsSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit Delivery Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
