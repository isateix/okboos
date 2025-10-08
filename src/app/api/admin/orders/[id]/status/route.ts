// src/app/api/admin/orders/[id]/status/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';
import { getAuthSession } from 'src/lib/auth'; // Assuming you have an auth utility

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getAuthSession();

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  const orderId = parseInt(params.id, 10);
  const { status, estimatedDelivery } = await req.json();

  if (!orderId || !status) {
    return NextResponse.json({ message: 'ID do pedido e status são obrigatórios' }, { status: 400 });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status,
        estimatedDelivery: estimatedDelivery || null,
      },
    });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ message: 'Erro ao atualizar status do pedido' }, { status: 500 });
  }
}
