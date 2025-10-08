// src/app/api/meus-pedidos/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getAuthSession } from 'src/lib/auth'; // Assuming you have an auth utility

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true,
        shippingAddress: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json({ message: 'Erro ao buscar pedidos' }, { status: 500 });
  }
}
