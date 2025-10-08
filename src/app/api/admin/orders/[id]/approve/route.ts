import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { getServerAuthSession } from 'src/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerAuthSession(req as any);

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  const orderId = parseInt(params.id, 10);
  const { deliveryDetails } = await req.json();

  if (isNaN(orderId)) {
    return NextResponse.json({ message: 'ID do pedido inválido' }, { status: 400 });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'APPROVED',
        estimatedDelivery: deliveryDetails || null,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
        shippingAddress: true,
      },
    });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error approving order:', error);
    return NextResponse.json({ message: 'Erro ao aprovar pedido' }, { status: 500 });
  }
}
