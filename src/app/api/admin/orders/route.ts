// src/app/api/admin/orders/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { getServerAuthSession } from 'src/lib/auth';

export async function GET(req: Request) {
  const session = await getServerAuthSession(req as any);

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
        shippingAddress: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log("Fetched orders for admin:", orders);
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return NextResponse.json({ message: 'Erro ao buscar todos os pedidos' }, { status: 500 });
  }
}
