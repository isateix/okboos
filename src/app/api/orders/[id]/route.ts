import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        shippingAddress: true,
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Error fetching order' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status, deliveryDetails } = await req.json();

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id, 10) },
      data: {
        status,
        deliveryDetails,
      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
  }
}