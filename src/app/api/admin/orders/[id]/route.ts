import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerAuthSession } from 'src/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  console.log("API Order Details: Raw ID from params:", params.id);
  const session = await getServerAuthSession(req as any);

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  const orderId = parseInt(params.id, 10);
  console.log("API Order Details: Parsed orderId:", orderId);

  if (isNaN(orderId)) {
    return NextResponse.json({ message: 'ID do pedido inválido' }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
        shippingAddress: true,
      },
    });

    if (!order) {
      return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error fetching single admin order:', error);
    return NextResponse.json({ message: 'Erro ao buscar detalhes do pedido' }, { status: 500 });
  }
}
