import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { getServerAuthSession } from 'src/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerAuthSession(req as any);

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  const orderId = parseInt(params.id, 10);
  const { estimatedDelivery } = await req.json();

  if (isNaN(orderId)) {
    return NextResponse.json({ message: 'ID do pedido inválido' }, { status: 400 });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        estimatedDelivery: estimatedDelivery || null,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
        shippingAddress: true,
      },
    });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error updating delivery details:', error);
    return NextResponse.json({ message: 'Erro ao atualizar detalhes de entrega' }, { status: 500 });
  }
}
