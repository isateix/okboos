import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { CartItem } from '../../../context/CartContext';

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'CASH_ON_DELIVERY' | 'BANK_TRANSFER';
  cart: CartItem[];
  total: number;
  userId?: number;
  proofOfPayment?: string;
}

export async function POST(req: Request) {
  const { name, email, phone, address, paymentMethod, cart, total, userId, proofOfPayment }: OrderData = await req.json();

  try {
    const order = await prisma.order.create({
      data: {
        status: paymentMethod === 'CASH_ON_DELIVERY' ? 'PENDING_APPROVAL' : 'PENDING_PAYMENT',
        paymentMethod,
        total,
        proofOfPayment,
        user: userId ? { connect: { id: userId } } : undefined,
        guestName: userId ? undefined : name,
        guestEmail: userId ? undefined : email,
        guestPhone: userId ? undefined : phone,
        shippingAddress: {
          create: {
            street: address,
            city: '', // You might want to add more address fields to your form
            state: '',
            zip: '',
            country: '',
          },
        },
        items: {
          create: cart.map((item) => ({
            productId: item.id.toString(),
            name: item.name,
            price: item.price,
            quantity: item.quantidade,
            color: item.selectedColor,
          })),
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        shippingAddress: true,
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}