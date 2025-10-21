import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { getServerAuthSession } from "src/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerAuthSession(req);

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
  }

  const orderId = parseInt(params.id, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ message: "ID do pedido inválido" }, { status: 400 });
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
      return NextResponse.json({ message: "Pedido não encontrado" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching single admin order:", error);
    return NextResponse.json({ message: "Erro ao buscar detalhes do pedido" }, { status: 500 });
  }
}
